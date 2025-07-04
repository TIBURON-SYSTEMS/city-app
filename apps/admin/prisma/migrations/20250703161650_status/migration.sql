-- CreateEnum
CREATE TYPE "BrandStatus" AS ENUM ('PENDING', 'ACTIVE', 'REJECTED');

-- AlterTable
ALTER TABLE "Brand" ADD COLUMN     "status" "BrandStatus" NOT NULL DEFAULT 'PENDING';
