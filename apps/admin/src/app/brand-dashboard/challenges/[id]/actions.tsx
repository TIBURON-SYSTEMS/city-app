"use server";

import { redirect } from "next/navigation";
import prisma from "../../../../../prisma/db";

export async function publishChallenge(id: string) {
  try {
    const publish = await prisma.challenge.update({
      where: {
        id,
      },
      data: {
        status: "active",
      },
    });

    return publish;
  } catch (error) {
    let message;

    if (error instanceof Error) message = error.message;
    else message = String(error);

    return new Error(message);
  }
}

export async function deleteChallenge(id: string) {
  try {
    const deleteChallenge = await prisma.challenge.delete({
      where: {
        id,
      },
    });

    return deleteChallenge;
  } catch (error) {
    let message;

    if (error instanceof Error) message = error.message;
    else message = String(error);

    return new Error(message);
  }
}

export async function goToRewardForm(id: string) {
  redirect(`/brand-dashboard/challenges/${id}/reward`);
}
