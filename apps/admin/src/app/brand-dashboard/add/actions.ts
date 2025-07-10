"use server";

import { ChallengeFormSchema } from "@/lib/schemas";
import { z } from "zod";
import prisma from "../../../../prisma/db";

type CreateChallengeData = z.infer<typeof ChallengeFormSchema>;

export async function createChallenge(
  data: CreateChallengeData,
  brand: string
) {
  const result = ChallengeFormSchema.safeParse(data);
  try {
    if (!result.success) {
      return new Error("Invalid data");
    }

    if (!brand) {
      return new Error("No brand id");
    }

    const challenge = await prisma.challenge.create({
      data: {
        label: result.data.label,
        endDate: result.data.endDate,
        goal: result.data.goal,
        description: result.data.description,
        brandId: brand,
        status: 'inactive'
      },
    });

    const product = await prisma.product.create({
      data: {
        label: result.data.product,
        material: result.data.material,
        brandId: brand,
      },
    });

    await prisma.challengeProduct.create({
      data: {
        challengeId: challenge.id,
        productId: product.id,
      },
    });

    return challenge;
  } catch (error) {
    let message;

    if (error instanceof Error) message = error.message;
    else message = String(error);

    return new Error(message);
  }
}
