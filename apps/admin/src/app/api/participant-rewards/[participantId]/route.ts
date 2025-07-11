import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../prisma/db";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ participantId: string }> }
) {
  try {
    const { participantId } = await params;

    if (!participantId) {
      return NextResponse.json(
        { error: "No participantId provided" },
        { status: 404 }
      );
    }

    const selectedRewards = await prisma.participantReward.findMany({
      where: {
        participantId,
        selected: true,
      },
      include: { reward: true },
    });

    return NextResponse.json(selectedRewards);
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error", details: error },
      { status: 500 }
    );
  }
}
