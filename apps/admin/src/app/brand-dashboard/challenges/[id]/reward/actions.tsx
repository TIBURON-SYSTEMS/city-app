"use server";

import prisma from "../../../../../../prisma/db";

export async function createReward(data: {
  label: string;
  amount: number;
  challengeId: string;
}) {
  try {
    const reward = await prisma.reward.create({
      data: {
        label: data.label,
        amount: data.amount,
        challengeId: data.challengeId,
      },
    });
    return reward;
  } catch (error) {
    let message;

    if (error instanceof Error) message = error.message;
    else message = String(error);

    return new Error(message);
  }
}
