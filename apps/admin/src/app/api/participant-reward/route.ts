import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../prisma/db";

export async function PUT(request: NextRequest) {
  try {
    const {
      participantId,
      rewardId,
    }: { participantId: string; rewardId: string } = await request.json();

    if (!participantId || !rewardId) {
      return NextResponse.json(
        { error: "No participantId or rewardId provided" },
        { status: 404 }
      );
    }

    const selectReward = await prisma.participantReward.update({
      where: {
        participantId_rewardId: {
          participantId,
          rewardId,
        },
      },
      data: {
        selected: true,
      },
    });

    return NextResponse.json(selectReward);
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error", details: error },
      { status: 500 }
    );
  }
}
