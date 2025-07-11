import { NextResponse, NextRequest } from "next/server";
import prisma from "../../../../../../../prisma/db";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string; participantId: string }> }
) {
  try {
    const { id } = await params;
    const { participantId } = await params;

    const eligibleReward = await prisma.participant.findUnique({
      where: {
        id: participantId,
        eligibleReward: {
          some: {
            rewardId: id,
          },
        },
      },
    });

    return NextResponse.json(eligibleReward);
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error", details: error },
      { status: 500 }
    );
  }
}
