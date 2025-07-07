// import { MOCK_PARTICIPATIONS } from "@/mocks/participations";
import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../prisma/db";

export async function GET(request: NextRequest) {
  try {
    const participantId = request.nextUrl.searchParams.get("participantId");
    const challengeId = request.nextUrl.searchParams.get("challengeId");
    if (!participantId || !challengeId)
      return NextResponse.json(
        {
          error: "No challengeId or participantId proivded",
        },
        { status: 400 }
      );

    console.log(participantId, challengeId);

    const participation = await prisma.participation.findMany({
      where: {
        participantId,
        challengeId,
      },
    });
    return NextResponse.json({ participation });

    // const participation = MOCK_PARTICIPATIONS.filter(
    //   (participation) =>
    //     participation.userId === userId &&
    //     participation.challengeId === challengeId
    // );
    // response.headers.set("Access-Control-Allow-Origin", "*");
    // response.headers.set(
    //   "Access-Control-Allow-Methods",
    //   "GET, POST, PUT, DELETE, OPTIONS"
    // );
    // response.headers.set(
    //   "Access-Control-Allow-Headers",
    //   "Content-Type, Authorization"
    // );

    // if (participation.length === 0) {
    //   return NextResponse.json({ participation: false });
    // }

    // return NextResponse.json({ participation: participation[0] });
    return NextResponse.json({ message: "erwerwer" });
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error", details: error },
      { status: 500 }
    );
  }
}
