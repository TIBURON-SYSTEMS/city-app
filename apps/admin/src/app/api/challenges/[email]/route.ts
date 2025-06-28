import { challenges } from "@/mocks/challenges";

import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ email: string }> }
) {
  try {
    const { email } = await params;
    const query = request.nextUrl.searchParams.get("condition");

    if (query === "ongoing") {
      const onGoingChallenges = challenges.filter((challenge) => {
        if (
          challenge.users.filter((user) => user.email === email).length === 1
        ) {
          return challenge;
        }
      });
      const response = NextResponse.json({ onGoingChallenges });

      return response;
    }

    if (query === "available") {
      const availableChallenges = challenges.filter((challenge) => {
        if (challenge.users.every((user) => user.email !== email)) {
          return challenge;
        }
      });
      const response = NextResponse.json({ availableChallenges });

      return response;
    }

    // response.headers.set("Access-Control-Allow-Origin", "*");
    // response.headers.set(
    //   "Access-Control-Allow-Methods",
    //   "GET, POST, PUT, DELETE, OPTIONS"
    // );
    // response.headers.set(
    //   "Access-Control-Allow-Headers",
    //   "Content-Type, Authorization"
    // );
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error", details: error },
      { status: 500 }
    );
  }
}
