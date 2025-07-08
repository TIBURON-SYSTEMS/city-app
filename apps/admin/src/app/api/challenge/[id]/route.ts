import { NextResponse, NextRequest } from "next/server";
import { challenges } from "@/mocks/challenges";
import prisma from "../../../../../prisma/db";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const challenge = await prisma.challenge.findUnique({
      where: {
        id,
        status: "active",
      },
      include: {
        rewards: true,
        brand: true,
        challengeProducts: {
          include: {
            product: true,
          },
        },
      },
    });

    if (!challenge) {
      return NextResponse.json(
        { error: "Challenge not found" },
        { status: 404 }
      );
    }

    const challengeRes = {
      id: challenge.id,
      label: challenge.label,
      status: challenge.status,
      goal: challenge.goal,
      brandId: challenge.brandId,
      brandName: challenge.brand.name,
      description: challenge.description,
      rewards: challenge.rewards,
      product: challenge.challengeProducts[0].product.label,
    };

    return NextResponse.json({ challengeRes });
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error", details: error },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const { email } = await request.json();

    //add logic
    challenges.map((challenge) => {
      if (challenge.id === id) {
        challenge.users.push({ id: "1", email });
      }
      return challenge;
    });

    return NextResponse.json({ users: challenges[1].users });
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error", details: error },
      { status: 500 }
    );
  }
}
