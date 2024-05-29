/*
  Warnings:

  - You are about to drop the column `cleaningfee` on the `ListingPrice` table. All the data in the column will be lost.
  - Added the required column `cleaningFee` to the `ListingPrice` table without a default value. This is not possible if the table is not empty.
  - Added the required column `listingId` to the `Review` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Listing` MODIFY `imageUrls` LONGTEXT NOT NULL,
    MODIFY `favoriteBy` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `ListingPrice` DROP COLUMN `cleaningfee`,
    ADD COLUMN `cleaningFee` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `Review` ADD COLUMN `listingId` INTEGER NOT NULL;

-- CreateIndex
CREATE INDEX `Review_listingId_idx` ON `Review`(`listingId`);
