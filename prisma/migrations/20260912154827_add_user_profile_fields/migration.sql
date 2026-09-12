-- CreateEnum
CREATE TYPE "DocumentType" AS ENUM ('CC', 'CE', 'TI', 'PASAPORTE');

-- AlterTable
ALTER TABLE "User"
ADD COLUMN     "documentNumber" TEXT,
ADD COLUMN     "documentType" "DocumentType",
ADD COLUMN     "firstName" TEXT,
ADD COLUMN     "lastName" TEXT,
ADD COLUMN     "nationality" TEXT,
ADD COLUMN     "phone" TEXT;

-- Preserve legacy names and provide unique values for fields that did not exist before.
UPDATE "User"
SET "firstName" = split_part(trim("name"), ' ', 1),
    "lastName" = CASE
      WHEN position(' ' in trim("name")) > 0 THEN trim(substr(trim("name"), position(' ' in trim("name")) + 1))
      ELSE split_part(trim("name"), ' ', 1)
    END,
    "documentType" = 'CC',
    "documentNumber" = 'LEGACY-' || "id",
    "nationality" = 'Colombia',
    "phone" = '0000000000';

ALTER TABLE "User"
ALTER COLUMN "firstName" SET NOT NULL,
ALTER COLUMN "lastName" SET NOT NULL,
ALTER COLUMN "documentType" SET NOT NULL,
ALTER COLUMN "documentNumber" SET NOT NULL,
ALTER COLUMN "nationality" SET NOT NULL,
ALTER COLUMN "phone" SET NOT NULL,
DROP COLUMN "name";

-- CreateTable
CREATE TABLE "AccessZone" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "minRole" "Role" NOT NULL DEFAULT 'USER',
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AccessZone_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AccessLog" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "zoneId" TEXT NOT NULL,
    "granted" BOOLEAN NOT NULL,
    "attemptedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AccessLog_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "AccessZone_name_key" ON "AccessZone"("name");

-- CreateIndex
CREATE INDEX "AccessLog_userId_idx" ON "AccessLog"("userId");

-- CreateIndex
CREATE INDEX "AccessLog_zoneId_idx" ON "AccessLog"("zoneId");

-- CreateIndex
CREATE INDEX "AccessLog_attemptedAt_idx" ON "AccessLog"("attemptedAt");

-- CreateIndex
CREATE UNIQUE INDEX "User_documentNumber_key" ON "User"("documentNumber");

-- AddForeignKey
ALTER TABLE "AccessLog" ADD CONSTRAINT "AccessLog_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AccessLog" ADD CONSTRAINT "AccessLog_zoneId_fkey" FOREIGN KEY ("zoneId") REFERENCES "AccessZone"("id") ON DELETE CASCADE ON UPDATE CASCADE;
