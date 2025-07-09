import { Prisma } from "@/generated/prisma";
import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../prisma/db";

type AiResultResponse = {
  message: string;
  result: aiResultInterface;
  success: boolean;
};
interface aiResultInterface {
  detectedItems: disposalResult[];
  timestamp: string;
}
type disposalResult = {
  id: string;
  disposedProduct: DisposedProduct;
  amount: number;
  confidence: string;
};
type DisposedProduct = {
  label: string;
  material: string;
  brandName: string;
};

type AffectedChallenge = Prisma.ProductGetPayload<{
  include: {
    // also include brand
    brand: true;
    challengeProducts: {
      include: {
        challenge: {
          include: {
            participations: true;
          };
        };
      };
    };
  };
}>;

export async function POST(request: NextRequest) {
  const {
    participantId,
    binId,
    aiResult,
  }: {
    participantId: string;
    binId: string;
    aiResult: AiResultResponse;
  } = await request.json();

  const { result } = aiResult;
  const { detectedItems } = result;

  const brandNamesArray = detectedItems.map(
    (item) => item.disposedProduct.brandName
  );

  const productNamesArray = detectedItems.map(
    (item) => item.disposedProduct.label
  );

  const affectedChallenges: AffectedChallenge[] = await prisma.product.findMany(
    {
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
        brand: true,
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
    }
  );

  if (affectedChallenges.length === 0) {
    return NextResponse.json(
      { error: "No disposed products" },
      { status: 404 }
    );
  }

  const productsIdArray = affectedChallenges.map((item) => item.id);

  const affectedChallengesIdArray = affectedChallenges.map(
    (item) => item.challengeProducts[0].challengeId
  );
  const affectedChallengesTitleArray = affectedChallenges.map(
    (item) => item.challengeProducts[0].challenge.label
  );

  const amountArray = affectedChallenges
    .map((item) => {
      const matched = detectedItems.find(
        (detectedItem) =>
          detectedItem.disposedProduct.label === item.label &&
          detectedItem.disposedProduct.brandName === item.brand?.name
      );

      return matched?.amount || 0;
    })
    .filter((item) => item !== 0);

  await prisma.disposal.create({
    data: {
      binId: binId,
      participantId: participantId,
      disposedProducts: {
        create: productsIdArray.map((item, index) => {
          return {
            productId: item,
            amount: amountArray[index],
          };
        }),
      },
    },
    include: {
      disposedProducts: true,
    },
  });

  const updateParticipations = amountArray.map((amount, index) => {
    return prisma.participation.update({
      where: {
        participantId_challengeId: {
          participantId: participantId,
          challengeId: affectedChallengesIdArray[index],
        },
      },
      data: {
        amount: {
          increment: amount,
        },
      },
    });
  });

  const updatedParticipations = await prisma.$transaction(updateParticipations);

  if (updatedParticipations.length === 0) {
    return NextResponse.json(
      { error: "Nothing to update participatios" },
      { status: 400 }
    );
  }

  const affectedChallengesWithAmounts = affectedChallengesTitleArray.map(
    (item, index) => {
      return {
        challengeTitle: item,
        amount: amountArray[index],
        challengeId: affectedChallengesIdArray[index],
      };
    }
  );

  return NextResponse.json(affectedChallengesWithAmounts);
}
