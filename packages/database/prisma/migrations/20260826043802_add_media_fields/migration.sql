-- AlterTable
ALTER TABLE "Service" ADD COLUMN     "media" JSONB;

-- AlterTable
ALTER TABLE "ServiceCategory" ADD COLUMN     "active" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "media" JSONB;
