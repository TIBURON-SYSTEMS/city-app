import { challenges } from "@/mocks/challenges";

import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const query = request.nextUrl.searchParams.get("condition");

    if (query === "ongoing") {
      const onGoingChallenges = challenges.filter((challenge) => {
        if (challenge.users.filter((user) => user.id === id).length === 1) {
          return challenge;
        }
      });
      const response = NextResponse.json({ onGoingChallenges });

      return response;
    }

    if (query === "available") {
      const availableChallenges = challenges.filter((challenge) => {
        if (challenge.users.every((user) => user.id !== id)) {
          return challenge;
        }
      });
      const response = NextResponse.json({ availableChallenges });

      return response;
    }
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error", details: error },
      { status: 500 }
    );
  }
}
