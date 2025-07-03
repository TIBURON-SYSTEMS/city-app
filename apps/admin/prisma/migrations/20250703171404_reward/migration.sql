/*
  Warnings:

  - You are about to drop the `_ChallengeToReward` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `amount` to the `Reward` table without a default value. This is not possible if the table is not empty.
  - Added the required column `challengeId` to the `Reward` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_ChallengeToReward" DROP CONSTRAINT "_ChallengeToReward_A_fkey";

-- DropForeignKey
ALTER TABLE "_ChallengeToReward" DROP CONSTRAINT "_ChallengeToReward_B_fkey";

-- AlterTable
ALTER TABLE "Reward" ADD COLUMN     "amount" INTEGER NOT NULL,
ADD COLUMN     "challengeId" TEXT NOT NULL;

-- DropTable
DROP TABLE "_ChallengeToReward";

-- AddForeignKey
ALTER TABLE "Reward" ADD CONSTRAINT "Reward_challengeId_fkey" FOREIGN KEY ("challengeId") REFERENCES "Challenge"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
