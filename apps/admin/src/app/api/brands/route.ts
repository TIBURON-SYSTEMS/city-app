import { NextResponse } from "next/server";
import prisma from "../../../../prisma/db";

export async function GET() {
  try {
    const brands = await prisma.brand.findMany({
      include: {
        user: {
          select: {
            email: true,
          },
        },
        _count: {
          select: {
            challenges: true,
            products: true,
          },
        },
      },
      orderBy: {
        name: "asc",
      },
    });

    return NextResponse.json({
      brands,
    });
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch brands" },
      { status: 500 }
    );
  }
}
