import { NextResponse } from "next/server";
import prisma from "../../../../../../prisma/db";
import { BrandStatus } from "@/generated/prisma";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    console.log("Received brand ID for approval:", id);

    const updatedBrand = await prisma.brand.update({
      where: { id },
      data: { status: BrandStatus.ACTIVE },
    });

    console.log("Brand updated successfully:", updatedBrand);

    return NextResponse.json({ success: true, brand: updatedBrand });
  } catch (error) {
    console.error("Error approving brand:", error);
    return NextResponse.json(
      {
        error: "Failed to approve brand",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
