import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../../prisma/db";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ email: string }> }
) {
  const { email } = await params;

  const user = await prisma.user.findUnique({
    where: {
      email,
    },
    include: {
      participant: {
        include: {
          participations: true,
        },
      },
    },
  });

  if (!user || !user.participant) {
    const newUser = await prisma.user.create({
      data: {
        email,
        role: "PARTICIPANT",
      },
    });

    const participant = await prisma.participant.create({
      data: {
        userId: newUser.id,
      },
    });
    return NextResponse.json({ participantId: participant.id });
  }

  return NextResponse.json({
    participantId: user.participant.id,
    participation: user.participant.participations,
  });
}
