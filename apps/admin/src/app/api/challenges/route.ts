import { NextResponse } from "next/server";

import prisma from "../../../../prisma/db";
import { Prisma } from "@/generated/prisma";

type ChallengeWithBrandRewardsProduct = Prisma.ChallengeGetPayload<{
  include: {
    brand: true;
    rewards: true;
    challengeProducts: {
      include: {
        product: true;
      };
    };
  };
}>;

export async function GET() {
  const allChallenges: ChallengeWithBrandRewardsProduct[] =
    await prisma.challenge.findMany({
      where: {
        status: "active",
      },
      include: {
        brand: true,
        rewards: true,
        challengeProducts: {
          include: {
            product: true,
          },
        },
      },
    });

  const challenges = allChallenges.map((challenge) => {
    return {
      id: challenge.id,
      label: challenge.label,
      status: challenge.status,
      goal: challenge.goal,
      brandId: challenge.brandId,
      brandName: challenge.brand.name,
      description: challenge.description,
      rewards: challenge.rewards,
      productName: challenge.challengeProducts.map(
        (challengeProduct) => challengeProduct.product.label
      )[0],
      amount: 0,
    };
  });

  return NextResponse.json({ challenges });
}
