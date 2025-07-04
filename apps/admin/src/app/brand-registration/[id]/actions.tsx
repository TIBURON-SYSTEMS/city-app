"use server";

import { BrandFormSchema } from "@/lib/schemas";
import { z } from "zod";
import prisma from "../../../../prisma/db";

type CreateBrandData = z.infer<typeof BrandFormSchema>;

export async function createBrand(data: CreateBrandData, id: string) {
  const result = BrandFormSchema.safeParse(data);

  try {
    if (!result.success) {
      console.error("Brand form validation failed:", result.error.errors);
      return { success: false, error: "Invalid brand data provided." };
    }

    const newBrand = await prisma.brand.create({
      data: {
        name: data.name,
        userId: id,
      },
    });
    return newBrand;
  } catch (error) {
    let message;

    if (error instanceof Error) message = error.message;
    else message = String(error);

    return new Error(message);
  }
}
