"use server";

import prisma from "../../../../../prisma/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function activateChallenge(challengeId: string) {
  try {
    const updatedChallenge = await prisma.challenge.update({
      where: { id: challengeId },
      data: { status: "active" },
    });

    revalidatePath("/dashboard");
    revalidatePath(`/dashboard/challenges/${challengeId}`);

    return { success: true, challenge: updatedChallenge };
  } catch (error) {
    console.error("Error activating challenge:", error);
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "Failed to activate challenge",
    };
  }
}

export async function deactivateChallenge(challengeId: string) {
  try {
    const updatedChallenge = await prisma.challenge.update({
      where: { id: challengeId },
      data: { status: "inactive" },
    });

    revalidatePath("/dashboard");
    revalidatePath(`/dashboard/challenges/${challengeId}`);

    return { success: true, challenge: updatedChallenge };
  } catch (error) {
    console.error("Error deactivating challenge:", error);
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "Failed to deactivate challenge",
    };
  }
}

export async function removeChallenge(challengeId: string) {
  try {
    await prisma.challengeProduct.deleteMany({
      where: { challengeId },
    });

    await prisma.reward.deleteMany({
      where: { challengeId },
    });

    await prisma.participation.deleteMany({
      where: { challengeId },
    });

    await prisma.challenge.delete({
      where: { id: challengeId },
    });

    redirect("/dashboard");
  } catch (error) {
    console.error("Error removing challenge:", error);
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "Failed to remove challenge",
    };
  }
}
