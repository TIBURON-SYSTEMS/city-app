"use server";

import z from "zod";
import prisma from "../../../../../../prisma/db";
import { BrandProfileSchema } from "@/lib/schemas";

type EditBrandProfileData = z.infer<typeof BrandProfileSchema>;

export async function editBrand(id: string, data: EditBrandProfileData) {
  const result = BrandProfileSchema.safeParse(data);

  try {
    if (!result.success) {
      return new Error("Invalid data");
    }
    if (!id) {
      return new Error("No brand id");
    }
    const updateBrandProfile = await prisma.brand.update({
      where: {
        id,
      },
      data: {
        description: result.data.description,
        logoUrl: result.data.image,
      },
    });

    return updateBrandProfile;
  } catch (error) {
    let message;

    if (error instanceof Error) message = error.message;
    else message = String(error);

    return new Error(message);
  }
}
