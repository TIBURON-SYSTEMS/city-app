import { NextResponse, NextRequest } from "next/server";
import prisma from "../../../../../prisma/db";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ participantId: string }> }
) {
  try {
    const { participantId } = await params;

    const rewards = await prisma.participation.findMany({
      where: { participantId, completed: true },
      include: {
        challenge: {
          include: {
            rewards: true,
          },
        },
      },
    });

    const rewardsRes = rewards.map((item) => {
      return {
        challengeId: item.challengeId,
        challengeLabel: item.challenge.label,
        rewards: item.challenge.rewards,
      };
    });

    return NextResponse.json(rewardsRes);
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error", details: error },
      { status: 500 }
    );
  }
}
