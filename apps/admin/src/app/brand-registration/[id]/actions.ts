"use server";

import { BrandFormSchema } from "@/lib/schemas";
import { z } from "zod";
import prisma from "../../../../prisma/db";
import { CourierClient } from "@trycourier/courier";

type CreateBrandData = z.infer<typeof BrandFormSchema>;

const courrierToken = process.env.COURIER_API_KEY;

const courier = new CourierClient({ authorizationToken: courrierToken });

export async function createBrand(data: CreateBrandData, id: string) {
  const result = BrandFormSchema.safeParse(data);

  if (!result.success) {
    console.error("Brand form validation failed:", result.error.errors);
    return { success: false, error: "Invalid brand data provided." };
  }
  try {
    const newBrand = await prisma.brand.create({
      data: {
        name: data.name,
        userId: id,
      },
    });

    const brandOwnerUser = await prisma.user.findUnique({
      where: { id: id },
      select: { email: true },
    });
    const brandOwnerEmail = brandOwnerUser?.email || "N/A";

    try {
      console.log("sending courrier");

      await courier.send({
        message: {
          to: {
            email: process.env.ADMIN_EMAIL,
          },

          template: process.env.COURIER_ADMIN_BRAND_REGISTERED_TEMPLATE_ID!,

          data: {
            brandName: newBrand.name,
            registeredEmail: brandOwnerEmail,
          },
        },
      });
    } catch (emailError) {
      console.error("Courier email failed to send:", emailError);
    }

    return newBrand;
  } catch (error) {
    let message;

    if (error instanceof Error) message = error.message;
    else message = String(error);

    return new Error(message);
  }
}
