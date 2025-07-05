/*
  Warnings:

  - You are about to drop the `_ChallengeToParticipant` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_ChallengeToParticipant" DROP CONSTRAINT "_ChallengeToParticipant_A_fkey";

-- DropForeignKey
ALTER TABLE "_ChallengeToParticipant" DROP CONSTRAINT "_ChallengeToParticipant_B_fkey";

-- DropTable
DROP TABLE "_ChallengeToParticipant";

-- CreateTable
CREATE TABLE "Participation" (
    "id" TEXT NOT NULL,
    "participantId" TEXT NOT NULL,
    "challengeId" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,

    CONSTRAINT "Participation_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Participation" ADD CONSTRAINT "Participation_participantId_fkey" FOREIGN KEY ("participantId") REFERENCES "Participant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Participation" ADD CONSTRAINT "Participation_challengeId_fkey" FOREIGN KEY ("challengeId") REFERENCES "Challenge"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
