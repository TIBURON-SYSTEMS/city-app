import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../prisma/db";
import { Participation } from "@/generated/prisma";

export async function GET(request: NextRequest) {
  try {
    const participantId = request.nextUrl.searchParams.get("participantId");
    const challengeId = request.nextUrl.searchParams.get("challengeId");

    if (!participantId || !challengeId)
      return NextResponse.json(
        {
          error: "No challengeId or participantId provided",
        },
        { status: 400 }
      );

    const participation: Participation[] = await prisma.participation.findMany({
      where: {
        participantId,
        challengeId,
      },
    });

    if (participation.length === 0) {
      return NextResponse.json({ isParticipating: false, participation: null });
    }

    return NextResponse.json({
      isParticipating: true,
      participation: participation[0],
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error", details: error },
      { status: 500 }
    );
  }
}
export async function POST(request: NextRequest) {
  const { participantId, challengeId } = await request.json();

  const newParticipation = await prisma.participation.create({
    data: { participantId, challengeId },
  });

  return NextResponse.json({ newParticipation });
}
