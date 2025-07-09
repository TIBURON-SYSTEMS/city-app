/*
  Warnings:

  - A unique constraint covering the columns `[participantId,challengeId]` on the table `Participation` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Participation_participantId_challengeId_key" ON "Participation"("participantId", "challengeId");
