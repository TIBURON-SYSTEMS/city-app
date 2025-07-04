import { MOCK_PARTICIPATIONS } from "@/mocks/participations";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const userId = request.nextUrl.searchParams.get("userId");
    const challengeId = request.nextUrl.searchParams.get("challengeId");

    const participation = MOCK_PARTICIPATIONS.filter(
      (participation) =>
        participation.userId === userId &&
        participation.challengeId === challengeId
    );
    // response.headers.set("Access-Control-Allow-Origin", "*");
    // response.headers.set(
    //   "Access-Control-Allow-Methods",
    //   "GET, POST, PUT, DELETE, OPTIONS"
    // );
    // response.headers.set(
    //   "Access-Control-Allow-Headers",
    //   "Content-Type, Authorization"
    // );

    if (participation.length === 0) {
      return NextResponse.json({ participation: false });
    }

    return NextResponse.json({ participation: participation[0] });
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error", details: error },
      { status: 500 }
    );
  }
}
