import { NextResponse } from "next/server";
import prisma from "../../../../prisma/db";

export async function GET() {
  try {
    const users = await prisma.user.findMany({
      include: {
        participant: true,
        brand: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    const totalUsers = await prisma.user.count();
    const totalBrands = await prisma.brand.count();
    const totalChallenges = await prisma.challenge.count();
    const totalProducts = await prisma.product.count();
    const totalDisposals = await prisma.disposal.count();
    const totalBins = await prisma.bin.count();

    const disposedProducts = await prisma.disposedProduct.aggregate({
      _sum: {
        amount: true,
      },
    });
    const itemsRecycled = disposedProducts._sum.amount || 0;

    return NextResponse.json({
      users,
      stats: {
        totalUsers,
        totalBrands,
        totalChallenges,
        totalProducts,
        itemsRecycled,
        totalBins,
        totalDisposals,
      },
    });
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch users" },
      { status: 500 }
    );
  }
}
