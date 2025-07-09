import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../../prisma/db";
import { Prisma } from "@/generated/prisma";

type OngoingChallenges = Prisma.ParticipantGetPayload<{
  include: {
    participations: {
      include: {
        challenge: {
          include: {
            brand: true;
            rewards: true;
            challengeProducts: {
              include: {
                product: true;
              };
            };
          };
        };
      };
    };
  };
}>;

type AvailableChallenge = Prisma.ChallengeGetPayload<{
  include: {
    brand: true;
    rewards: true;
    challengeProducts: {
      include: {
        product: true;
      };
    };
  };
}>;

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ participantId: string }> }
) {
  const { participantId } = await params;

  const ongoingChallenges: OngoingChallenges | null =
    await prisma.participant.findUnique({
      where: {
        id: participantId,
      },
      include: {
        participations: {
          where: {
            challenge: {
              status: "active",
            },
          },
          include: {
            challenge: {
              include: {
                brand: true,
                rewards: true,
                challengeProducts: {
                  include: {
                    product: true,
                  },
                },
              },
            },
          },
        },
      },
    });
  if (!ongoingChallenges) {
    return NextResponse.json(
      { error: "ongoingChallenges not found" },
      { status: 404 }
    );
  }

  const ongoingChallengesRes = ongoingChallenges.participations.map(
    (participation) => {
      return {
        id: participation.challengeId,
        label: participation.challenge.label,
        status: participation.challenge.status,
        goal: participation.challenge.goal,
        brandId: participation.challenge.brandId,
        brandName: participation.challenge.brand.name,
        description: participation.challenge.description,
        rewards: participation.challenge.rewards,
        productName: participation.challenge.challengeProducts.map(
          (challengeProduct) => challengeProduct.product.label
        )[0],
        amount: participation.amount,
      };
    }
  );

  const availableChallenge: AvailableChallenge[] =
    await prisma.challenge.findMany({
      where: {
        status: "active",
        participations: {
          none: {
            participantId: participantId,
          },
        },
      },
      include: {
        brand: true,
        rewards: true,
        challengeProducts: {
          include: {
            product: true,
          },
        },
      },
    });

  const availableChallengesRes = availableChallenge.map((challenge) => ({
    id: challenge.id,
    label: challenge.label,
    status: challenge.status,
    goal: challenge.goal,
    brandId: challenge.brandId,
    brandName: challenge.brand.name,
    description: challenge.description,
    rewards: challenge.rewards,
    productName: challenge.challengeProducts.map((p) => p.product.label)[0],
    amount: 0,
  }));

  return NextResponse.json({ ongoingChallengesRes, availableChallengesRes });
}
