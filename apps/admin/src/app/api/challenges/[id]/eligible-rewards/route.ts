import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../../prisma/db";

type RewardResponse = {
  id: string;
  label: string;
  amount: number;
  imageUrl: string | null;
};

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id: challengeId } = await params;

  if (!challengeId) {
    return NextResponse.json(
      { error: "Challenge ID is required." },
      { status: 400 }
    );
  }

  try {
    const rewards = await prisma.reward.findMany({
      where: {
        challengeId: challengeId,
      },
      select: {
        id: true,
        label: true,
        amount: true,
        imageUrl: true,
      },
    });

    const eligibleRewards: RewardResponse[] = rewards.map((reward) => ({
      id: reward.id,
      label: reward.label,
      amount: reward.amount,
      imageUrl: reward.imageUrl,
    }));

    return NextResponse.json({ rewards: eligibleRewards }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error", details: error },
      { status: 500 }
    );
  }
}
