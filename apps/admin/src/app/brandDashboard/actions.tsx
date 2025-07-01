"use server";

import { ChallengeFormSchema } from "@/lib/schemas";
import { z } from "zod";
import prisma from "../../../prisma/db";

type CreateChallengeData = z.infer<typeof ChallengeFormSchema>;

export async function createChallenge(
  data: CreateChallengeData,
  brand: string
) {
  const result = ChallengeFormSchema.safeParse(data);

  try {
    if (!result.success) {
      return { error: "Invalid data" };
    }

    if (!brand) {
      return { error: "No brand id" };
    }

    await prisma.challenge.create({
      data: {
        label: result.data.label,
        status: result.data.published,
        endDate: result.data.endDate,
        goal: result.data.goal,
        description: result.data.description,
        // product: result.data.product,
        // type: result.data.material,
        brandId: brand,
        products: {
          create: {
            label: result.data.product,
            material: result.data.material,
            brandId: brand,
          },
        },
      },
    });
  } catch (error) {
    return { error };
  }
  return;
}
