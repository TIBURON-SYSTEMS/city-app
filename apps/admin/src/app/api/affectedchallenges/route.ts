import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../prisma/db";
import { Prisma } from "@/generated/prisma";

type AffectedChallenge = Prisma.ProductGetPayload<{
  include: {
    challengeProducts: {
      include: {
        challenge: true;
      };
    };
  };
}>;

export async function GET(request: NextRequest) {
  try {
    const brandNames = request.nextUrl.searchParams.get("brandNames");
    const productNames = request.nextUrl.searchParams.get("productNames");
    const participantId = request.nextUrl.searchParams.get("participantId");

    if (!brandNames || !productNames || !participantId) {
      return NextResponse.json(
        { error: "Missing query parameters" },
        { status: 400 }
      );
    }

    const brandNamesArray = brandNames.split(",");
    const productNamesArray = productNames.split(",");

    const affectedChallenges: AffectedChallenge[] =
      await prisma.product.findMany({
        where: {
          challengeProducts: {
            some: {
              challenge: {
                participations: {
                  some: {
                    participantId: participantId,
                  },
                },
              },
            },
          },
          brand: {
            name: {
              in: brandNamesArray,
            },
          },
          label: {
            in: productNamesArray,
          },
        },
        include: {
          challengeProducts: {
            include: {
              challenge: {
                include: {
                  participations: true,
                },
              },
            },
          },
        },
      });
    if (affectedChallenges.length === 0) {
      return NextResponse.json(
        {
          error: "No product found for the specified participant and criteria",
        },
        { status: 404 }
      );
    }

    const affectedChallengesRes = affectedChallenges.flatMap((item) =>
      item.challengeProducts.map((item) => item.challenge)
    );

    return NextResponse.json(affectedChallengesRes);
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error", details: error },
      { status: 500 }
    );
  }
}
