import { Participation, Prisma } from "@/generated/prisma";
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
                  completed: false,
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
    console.log(aiResult, "🟥");
    console.log(affectedChallenges, "🟥");

    return NextResponse.json([]);
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

  const affectedChallengeGoalArray = affectedChallenges.map(
    (item) => item.challengeProducts[0].challenge.goal
  );

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
      { error: "Nothing to update participation" },
      { status: 400 }
    );
  }

  const affectedChallengeUpdatedParticip = updatedParticipations.map(
    (item) => item.amount
  );

  let completedParticipation: Participation;
  for (
    let index = 0;
    index < affectedChallengeUpdatedParticip.length;
    index++
  ) {
    if (
      affectedChallengeUpdatedParticip[index] >=
      affectedChallengeGoalArray[index]
    ) {
      completedParticipation = await prisma.participation.update({
        where: {
          participantId_challengeId: {
            participantId: participantId,
            challengeId: affectedChallengesIdArray[index],
          },
        },
        data: {
          completed: true,
        },
      });
    }
  }

  //return object
  const affectedChallengesWithAmounts = affectedChallengesTitleArray.map(
    (item, index) => {
      return {
        challengeTitle: item,
        amount: amountArray[index],
        challengeId: affectedChallengesIdArray[index],
        completed:
          completedParticipation &&
          completedParticipation.challengeId ===
            affectedChallengesIdArray[index]
            ? true
            : false,
      };
    }
  );

  return NextResponse.json(affectedChallengesWithAmounts);
}
