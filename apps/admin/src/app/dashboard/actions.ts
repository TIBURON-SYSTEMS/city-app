"use server";

import { z } from "zod";
import prisma from "../../../prisma/db";
import { CourierClient } from "@trycourier/courier";
import { auth0 } from "@/lib/auth0";
import { revalidatePath } from "next/cache";

import { BrandStatus } from "@/generated/prisma";

const UpdateBrandStatusSchema = z.object({
  brandId: z.string().cuid("Invalid Brand ID format."),
  newStatus: z.nativeEnum(BrandStatus),
  rejectionReason: z.string().optional(),
});

const courierToken = process.env.COURIER_API_KEY;
const courier = new CourierClient({ authorizationToken: courierToken });

type UpdateBrandStatusSuccess = {
  success: true;
  brandId: string;
  newStatus: BrandStatus;
  message?: string;
};
type UpdateBrandStatusError = { success: false; error: string };

export async function updateBrandStatus(
  input: z.infer<typeof UpdateBrandStatusSchema>
): Promise<UpdateBrandStatusSuccess | UpdateBrandStatusError> {
  const validationResult = UpdateBrandStatusSchema.safeParse(input);

  if (!validationResult.success) {
    console.error(
      "Update Brand Status validation failed:",
      validationResult.error.errors
    );
    return {
      success: false,
      error: "Invalid input data provided for brand status update.",
    };
  }

  const { brandId, newStatus, rejectionReason } = validationResult.data;

  const session = await auth0.getSession();
  if (!session || !session.user || !session.user.email) {
    console.error(
      "No valid session or user email found for brand status update attempt."
    );
    return {
      success: false,
      error: "Authentication required to update brand status.",
    };
  }

  const roles = (session.user.tiburonroles as string[]) || [];
  if (!roles.includes("admin")) {
    console.warn(
      `Unauthorized attempt to update brand status by user: ${session.user.email}`
    );
    return {
      success: false,
      error: "Unauthorized: Only administrators can update brand status.",
    };
  }

  try {
    const updatedBrand = await prisma.brand.update({
      where: { id: brandId },
      data: {
        status: newStatus,
      },
      select: {
        id: true,
        name: true,
        status: true,
        user: {
          select: {
            email: true,
          },
        },
      },
    });

    //Send Notification to Brand Owner (via Courier) ---
    const brandOwnerEmail = updatedBrand.user?.email;
    const courierStatusTemplateId =
      process.env.COURIER_BRAND_STATUS_TEMPLATE_ID;

    if (brandOwnerEmail && courierStatusTemplateId) {
      try {
        console.log(
          `Sending Courier notification for brand status update to ${brandOwnerEmail}`
        );
        await courier.send({
          message: {
            to: {
              email: brandOwnerEmail,
            },
            template: courierStatusTemplateId,
            data: {
              brandName: updatedBrand.name,
              newStatus: newStatus,
              rejectionReason:
                newStatus === BrandStatus.REJECTED
                  ? rejectionReason
                  : undefined,
            },
          },
        });
        console.log("Courier notification for brand status sent successfully.");
      } catch (emailError) {
        console.error(
          "Courier email failed to send for brand status update:",
          emailError
        );
      }
    } else {
      console.warn(
        `No email sent for brand ${brandId}. Owner email: ${brandOwnerEmail}, Courier Status Template ID set: ${!!courierStatusTemplateId}`
      );
    }

    revalidatePath("/dashboard/brands");

    return {
      success: true,
      brandId: updatedBrand.id,
      newStatus: updatedBrand.status,
      message: `Brand '${updatedBrand.name}' status updated to ${updatedBrand.status}.`,
    };
  } catch (error: unknown) {
    console.error(`Error updating brand status for ID ${brandId}:`, error);

    if (
      error &&
      typeof error === "object" &&
      "code" in error &&
      error.code === "P2025"
    ) {
      return {
        success: false,
        error: "Brand not found or could not be updated.",
      };
    }

    let errorMessage: string;
    if (error instanceof Error) {
      errorMessage = error.message;
    } else if (typeof error === "string") {
      errorMessage = error;
    } else {
      errorMessage = "An unexpected error occurred during brand status update.";
    }
    return { success: false, error: errorMessage };
  }
}
