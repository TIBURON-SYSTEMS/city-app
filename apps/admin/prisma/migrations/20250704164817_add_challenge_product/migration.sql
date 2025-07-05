/*
  Warnings:

  - You are about to drop the column `challengeId` on the `Product` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_challengeId_fkey";

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "challengeId";

-- CreateTable
CREATE TABLE "ChallengeProduct" (
    "id" TEXT NOT NULL,
    "challengeId" TEXT NOT NULL,
    "productId" TEXT NOT NULL,

    CONSTRAINT "ChallengeProduct_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ChallengeProduct" ADD CONSTRAINT "ChallengeProduct_challengeId_fkey" FOREIGN KEY ("challengeId") REFERENCES "Challenge"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChallengeProduct" ADD CONSTRAINT "ChallengeProduct_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
