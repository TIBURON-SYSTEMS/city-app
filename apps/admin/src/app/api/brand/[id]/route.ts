import { NextResponse, NextRequest } from "next/server";
import { brands } from "@/mocks/brands";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const brand = brands.filter((brand) => brand.id === id);
    const response = NextResponse.json({ brand: brand[0] });

    // response.headers.set("Access-Control-Allow-Origin", "*");
    // response.headers.set(
    //   "Access-Control-Allow-Methods",
    //   "GET, POST, PUT, DELETE, OPTIONS"
    // );
    // response.headers.set(
    //   "Access-Control-Allow-Headers",
    //   "Content-Type, Authorization"
    // );

    return response;
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error", details: error },
      { status: 500 }
    );
  }
}
