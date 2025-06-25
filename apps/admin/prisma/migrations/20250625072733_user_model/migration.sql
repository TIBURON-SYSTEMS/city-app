-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('PARTICIPANT', 'BRAND', 'ADMIN');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT,
    "role" "UserRole"[],

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);
