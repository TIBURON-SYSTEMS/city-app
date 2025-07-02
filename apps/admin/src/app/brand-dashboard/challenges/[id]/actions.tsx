"use server";

import prisma from "../../../../../prisma/db";

export async function publishChallenge(id: string) {
  try {
    await prisma.challenge.update({
      where: {
        id,
      },
      data: {
        status: "active",
      },
    });
  } catch (error) {
    return { error };
  }
}

export async function deleteChallenge(id: string) {
  try {
    await prisma.challenge.delete({
      where: {
        id,
      },
    });
  } catch (error) {
    return { error };
  }
}
