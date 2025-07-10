"use server";

import prisma from "../../../../prisma/db";
import { auth0 } from "@/lib/auth0";
import { redirect } from "next/navigation";

export async function getChallenges() {
  try {
    const challenges = await prisma.challenge.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        brand: {
          select: {
            id: true,
            name: true,
          },
        },
        _count: {
          select: {
            participations: true,
            rewards: true,
            challengeProducts: true,
          },
        },
      },
    });

    return challenges;
  } catch (error) {
    console.error("Error fetching challenges:", error);
    throw new Error("Failed to fetch challenges");
  }
}

export async function getParticipantsInChallenge(challengeId: string) {
  const session = await auth0.getSession();
  if (!session) {
    redirect("/auth/login");
  }

  const roles = (session.user.tiburonroles as string[]) || [];
  if (!roles.includes("admin")) {
    redirect("/unauthorized");
  }

  try {
    const participants = await prisma.participation.findMany({
      where: {
        challengeId,
      },
      include: {
        participant: {
          include: {
            user: {
              select: {
                id: true,
                email: true,
                createdAt: true,
              },
            },
          },
        },
      },
      orderBy: {
        amount: "desc",
      },
    });

    return participants.map((p) => ({
      participationId: p.id,
      participantId: p.participant.id,
      userId: p.participant.user.id,
      email: p.participant.user.email,
      progress: p.amount,
      joinedAt: p.createdAt,
      userCreatedAt: p.participant.user.createdAt,
    }));
  } catch (error) {
    console.error("Error fetching participants:", error);
    throw new Error("Failed to fetch participants");
  }
}

export async function getChallengesForUser(userId: string) {
  const session = await auth0.getSession();
  if (!session) {
    redirect("/auth/login");
  }

  const roles = (session.user.tiburonroles as string[]) || [];
  if (!roles.includes("admin")) {
    redirect("/unauthorized");
  }

  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        participant: {
          include: {
            participations: {
              include: {
                challenge: {
                  include: {
                    brand: {
                      select: {
                        id: true,
                        name: true,
                      },
                    },
                    _count: {
                      select: {
                        participations: true,
                      },
                    },
                  },
                },
              },
              orderBy: {
                createdAt: "desc",
              },
            },
          },
        },
      },
    });

    if (!user?.participant) {
      return [];
    }

    return user.participant.participations.map((p) => ({
      participationId: p.id,
      challengeId: p.challenge.id,
      challengeName: p.challenge.label,
      challengeStatus: p.challenge.status,
      brandId: p.challenge.brand.id,
      brandName: p.challenge.brand.name,
      progress: p.amount,
      goal: p.challenge.goal,
      joinedAt: p.createdAt,
      totalParticipants: p.challenge._count.participations,
    }));
  } catch (error) {
    console.error("Error fetching user challenges:", error);
    throw new Error("Failed to fetch user challenges");
  }
}
