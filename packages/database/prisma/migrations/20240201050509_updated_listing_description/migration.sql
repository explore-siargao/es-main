/*
  Warnings:

  - A unique constraint covering the columns `[listingId]` on the table `ListingDescription` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `listingdescription` ADD COLUMN `listingId` INTEGER NULL;

-- CreateIndex
CREATE UNIQUE INDEX `ListingDescription_listingId_key` ON `ListingDescription`(`listingId`);

-- CreateIndex
CREATE INDEX `ListingDescription_listingId_idx` ON `ListingDescription`(`listingId`);
