import { auth0 } from "@/lib/auth0";
import prisma from "../../../../../prisma/db";
import { redirect } from "next/navigation";
import ChallengeDetails from "@/components/brandDashboard/challenge-details";
import { Prisma } from "@/generated/prisma";

type Params = Promise<{ id: string }>;

export async function generateMetadata(props: { params: Params }) {
  const params = await props.params;
  const id = params.id;
  return id;
}

export type ChallengeWithProduct = Prisma.ChallengeGetPayload<{
  include: {
    challengeProducts: {
      include: {
        product: true;
      };
    };
    rewards: true;
    participations: {
      include: {
        participant: true;
      };
    };
  };
}>;

export default async function ChallengeDetailsPage(props: { params: Params }) {
  const params = await props.params;
  const id = params.id;
  const session = await auth0.getSession();
  if (!session) {
    redirect("/auth/login");
  }

  const challenge: ChallengeWithProduct | null =
    await prisma.challenge.findUnique({
      where: {
        id,
      },
      include: {
        challengeProducts: {
          include: {
            product: true,
          },
        },
        rewards: true,
        participations: {
          include: {
            participant: true,
          },
        },
      },
    });

  if (!challenge) return;

  return (
    <>
      <ChallengeDetails data={challenge} />
    </>
  );
}
