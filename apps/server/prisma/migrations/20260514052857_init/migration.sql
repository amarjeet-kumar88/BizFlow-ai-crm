/*
  Warnings:

  - Added the required column `updatedAt` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('SUPER_ADMIN', 'BUSINESS_OWNER', 'MANAGER', 'STAFF', 'COUNSELLOR', 'SUPPORT_AGENT');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "refreshToken" TEXT,
ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'STAFF',
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;
