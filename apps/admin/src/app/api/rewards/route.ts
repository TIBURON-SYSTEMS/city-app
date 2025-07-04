import { MOCK_REWARDS } from "@/mocks/rewards";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const challengeId = request.nextUrl.searchParams.get("challengeId");

    const rewards = MOCK_REWARDS.filter(
      (reward) => reward.challengeId === challengeId
    );

    if (rewards.length === 0) {
      return NextResponse.json({ participation: false });
    }

    return NextResponse.json({ rewards });
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error", details: error },
      { status: 500 }
    );
  }
}
