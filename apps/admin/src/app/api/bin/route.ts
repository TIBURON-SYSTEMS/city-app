import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../prisma/db";

export async function GET(request: NextRequest) {
  try {
    const lat = request.nextUrl.searchParams.get("lat");
    const lon = request.nextUrl.searchParams.get("lon");
    const type = request.nextUrl.searchParams.get("type");

    if (!lat || !lon || !type) {
      return NextResponse.json(
        { error: "Query parameters are missing" },
        { status: 400 }
      );
    }

    const bin = await prisma.bin.findMany({
      where: {
        type,
        latitude: parseFloat(lat),
        longitude: parseFloat(lon),
      },
    });

    if (bin.length === 0) {
      return NextResponse.json({ error: "Bin not found" }, { status: 404 });
    }

    return NextResponse.json(bin[0]);
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error", details: error },
      { status: 500 }
    );
  }
}
