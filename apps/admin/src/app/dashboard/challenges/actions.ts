"use server";

import prisma from "../../../../prisma/db";

export async function getChallenges() {
  try {
    const challenges = await prisma.challenge.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        brand: {
          select: {
            id: true,
            name: true,
          },
        },
        _count: {
          select: {
            participations: true,
            rewards: true,
            challengeProducts: true,
          },
        },
      },
    });

    return challenges;
  } catch (error) {
    console.error("Error fetching challenges:", error);
    throw new Error("Failed to fetch challenges");
  }
}
