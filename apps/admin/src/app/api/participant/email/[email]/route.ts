import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../../prisma/db";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ email: string }> }
) {
  const { email } = await params;

  const user = await prisma.user.findUnique({
    where: {
      email,
    },
    include: {
      participant: true,
    },
  });

  if (!user || !user.participant) {
    const newUser = await prisma.user.create({
      data: {
        email,
        role: "PARTICIPANT",
      },
    });

    const participant = await prisma.participant.create({
      data: {
        userId: newUser.id,
      },
    });
    return NextResponse.json({ participantId: participant.id });
  }

  // const rewardWithChallenges: { [challengeId: string]: Reward[] } = {};
  // for (let i = 0; i < user.participant.eligibleReward.length; i++) {
  //   if (
  //     rewardWithChallenges.hasOwnProperty(
  //       user.participant.eligibleReward[i].reward.challengeId
  //     )
  //   ) {
  //     rewardWithChallenges[
  //       user.participant.eligibleReward[i].reward.challengeId
  //     ].push(user.participant.eligibleReward[i].reward);
  //   } else {
  //     rewardWithChallenges[
  //       user.participant.eligibleReward[i].reward.challengeId
  //     ] = [user.participant.eligibleReward[i].reward];
  //   }
  // }

  // console.log(rewardWithChallenges, "✅");

  return NextResponse.json({
    participantId: user.participant.id,
  });
}
