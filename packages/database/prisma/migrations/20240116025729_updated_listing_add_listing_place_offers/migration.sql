/*
  Warnings:

  - You are about to alter the column `latitude` on the `Listing` table. The data in that column could be lost. The data in that column will be cast from `Decimal(10,0)` to `Decimal`.
  - You are about to alter the column `longitude` on the `Listing` table. The data in that column could be lost. The data in that column will be cast from `Decimal(10,0)` to `Decimal`.
  - You are about to drop the column `listingId` on the `PlaceOffers` table. All the data in the column will be lost.
  - Added the required column `category` to the `PlaceOffers` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `PlaceOffers_listingId_idx` ON `PlaceOffers`;

-- AlterTable
ALTER TABLE `Listing` MODIFY `latitude` DECIMAL NULL,
    MODIFY `longitude` DECIMAL NULL;

-- AlterTable
ALTER TABLE `PlaceOffers` DROP COLUMN `listingId`,
    ADD COLUMN `category` VARCHAR(191) NOT NULL;

-- CreateTable
CREATE TABLE `ListingPlaceOffers` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `listingId` INTEGER NOT NULL,
    `placeOfferId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `deletedAt` DATETIME(3) NULL,

    INDEX `ListingPlaceOffers_listingId_idx`(`listingId`),
    INDEX `ListingPlaceOffers_placeOfferId_idx`(`placeOfferId`),
    UNIQUE INDEX `ListingPlaceOffers_listingId_placeOfferId_key`(`listingId`, `placeOfferId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
