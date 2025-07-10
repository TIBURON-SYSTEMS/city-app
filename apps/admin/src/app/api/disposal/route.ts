
import { Participation, Prisma, Reward } from "@/generated/prisma";

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
    brand: true;
    challengeProducts: {
      include: {
        challenge: {
          include: {
            participations: true;
            rewards: true;
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
                rewards: true,
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


  const affectedChallengeRewardsArray = affectedChallenges.map(
    (item) => item.challengeProducts[0].challenge.rewards
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


  const completedParticipation: Participation[] = [];
  const rewardsOfCompletedChallenges: Reward[][] = [];

  for (
    let index = 0;
    index < affectedChallengeUpdatedParticip.length;
    index++
  ) {
    if (
      affectedChallengeUpdatedParticip[index] >=
      affectedChallengeGoalArray[index]
    ) {

      completedParticipation.push(
        await prisma.participation.update({
          where: {
            participantId_challengeId: {
              participantId: participantId,
              challengeId: affectedChallengesIdArray[index],
            },
          },
          data: {
            completed: true,
          },
        })
      );
      rewardsOfCompletedChallenges.push(affectedChallengeRewardsArray[index]);
    }
  }

  await prisma.participantReward.createMany({
    data: rewardsOfCompletedChallenges
      .flatMap((reward) => reward.map((item) => item))
      .map((item) => {
        return {
          participantId,
          rewardId: item.id,
        };
      }),
  });


  //return object
  const affectedChallengesWithAmounts = affectedChallengesTitleArray.map(
    (item, index) => {
      return {
        challengeTitle: item,
        amount: amountArray[index],
        challengeId: affectedChallengesIdArray[index],
        completed:

          completedParticipation.length > 0 &&
          completedParticipation.some(
            (participation) =>
              participation.challengeId === affectedChallengesIdArray[index]
          ),
      };
    }
  );

  return NextResponse.json(affectedChallengesWithAmounts);
}
