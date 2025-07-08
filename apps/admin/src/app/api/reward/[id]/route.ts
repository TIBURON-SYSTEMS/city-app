import { NextResponse, NextRequest } from "next/server";
import prisma from "../../../../../prisma/db";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const reward = await prisma.reward.findUnique({
      where: {
        id,
      },
    });

    if (!reward) {
      return NextResponse.json({ error: "No rewards found" }, { status: 404 });
    }

    return NextResponse.json({ reward });
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error", details: error },
      { status: 500 }
    );
  }
}
