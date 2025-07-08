import { NextResponse, NextRequest } from "next/server";
import prisma from "../../../../../prisma/db";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const brand = await prisma.brand.findUnique({
      where: {
        id,
      },
    });

    if (!brand) {
      return NextResponse.json(
        { error: "No brand found" },
        {
          status: 404,
        }
      );
    }
    return NextResponse.json({ brand });
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error", details: error },
      { status: 500 }
    );
  }
}
