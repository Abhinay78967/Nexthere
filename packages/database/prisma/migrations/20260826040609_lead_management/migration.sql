/*
  Warnings:

  - You are about to drop the column `aiGenerated` on the `Lead` table. All the data in the column will be lost.
  - You are about to drop the column `contactEmail` on the `Lead` table. All the data in the column will be lost.
  - You are about to drop the column `contactName` on the `Lead` table. All the data in the column will be lost.
  - You are about to drop the column `requirements` on the `Lead` table. All the data in the column will be lost.
  - You are about to drop the column `serviceCategory` on the `Lead` table. All the data in the column will be lost.
  - The `status` column on the `Lead` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `email` to the `Lead` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Lead` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Lead` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "LeadStatus" AS ENUM ('NEW', 'CONTACTED', 'QUALIFIED', 'PROPOSAL', 'WON', 'LOST');

-- CreateEnum
CREATE TYPE "LeadSource" AS ENUM ('WEBSITE', 'SERVICE_PAGE', 'CONTACT_FORM', 'QUOTE_REQUEST', 'AI_ADVISOR', 'REFERRAL', 'OTHER');

-- CreateEnum
CREATE TYPE "LeadPriority" AS ENUM ('LOW', 'MEDIUM', 'HIGH', 'URGENT');

-- AlterTable
ALTER TABLE "Lead" DROP COLUMN "aiGenerated",
DROP COLUMN "contactEmail",
DROP COLUMN "contactName",
DROP COLUMN "requirements",
DROP COLUMN "serviceCategory",
ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "notes" TEXT,
ADD COLUMN     "organizationId" TEXT,
ADD COLUMN     "phone" TEXT,
ADD COLUMN     "priority" "LeadPriority" NOT NULL DEFAULT 'MEDIUM',
ADD COLUMN     "serviceCategoryId" TEXT,
ADD COLUMN     "serviceId" TEXT,
ADD COLUMN     "source" "LeadSource" NOT NULL DEFAULT 'WEBSITE',
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
DROP COLUMN "status",
ADD COLUMN     "status" "LeadStatus" NOT NULL DEFAULT 'NEW';

-- CreateTable
CREATE TABLE "Inquiry" (
    "id" TEXT NOT NULL,
    "leadId" TEXT NOT NULL,
    "serviceId" TEXT,
    "subject" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "location" TEXT,
    "timeline" TEXT,
    "budgetRange" TEXT,
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Inquiry_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Inquiry_createdAt_idx" ON "Inquiry"("createdAt");

-- CreateIndex
CREATE INDEX "Inquiry_leadId_idx" ON "Inquiry"("leadId");

-- CreateIndex
CREATE INDEX "Lead_status_idx" ON "Lead"("status");

-- CreateIndex
CREATE INDEX "Lead_email_idx" ON "Lead"("email");

-- CreateIndex
CREATE INDEX "Lead_createdAt_idx" ON "Lead"("createdAt");

-- AddForeignKey
ALTER TABLE "Lead" ADD CONSTRAINT "Lead_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Lead" ADD CONSTRAINT "Lead_serviceCategoryId_fkey" FOREIGN KEY ("serviceCategoryId") REFERENCES "ServiceCategory"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Lead" ADD CONSTRAINT "Lead_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "Service"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Inquiry" ADD CONSTRAINT "Inquiry_leadId_fkey" FOREIGN KEY ("leadId") REFERENCES "Lead"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Inquiry" ADD CONSTRAINT "Inquiry_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "Service"("id") ON DELETE SET NULL ON UPDATE CASCADE;
