/*
  Warnings:

  - You are about to drop the column `userId` on the `Bin` table. All the data in the column will be lost.
  - You are about to drop the column `date` on the `Disposal` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name]` on the table `Brand` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Bin" DROP COLUMN "userId";

-- AlterTable
ALTER TABLE "Disposal" DROP COLUMN "date";

-- AlterTable
ALTER TABLE "Participation" ALTER COLUMN "amount" SET DEFAULT 0;

-- CreateIndex
CREATE UNIQUE INDEX "Brand_name_key" ON "Brand"("name");
