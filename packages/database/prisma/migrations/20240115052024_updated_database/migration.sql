/*
  Warnings:

  - You are about to alter the column `latitude` on the `Listing` table. The data in that column could be lost. The data in that column will be cast from `Decimal(10,0)` to `Decimal`.
  - You are about to alter the column `longitude` on the `Listing` table. The data in that column could be lost. The data in that column will be cast from `Decimal(10,0)` to `Decimal`.
  - A unique constraint covering the columns `[basicAboutPlaceId]` on the table `Listing` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `Listing` ADD COLUMN `basicAboutPlaceId` INTEGER NULL,
    MODIFY `latitude` DECIMAL NULL,
    MODIFY `longitude` DECIMAL NULL;

-- CreateTable
CREATE TABLE `BasicAboutPlace` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `guests` INTEGER NOT NULL,
    `bedRooms` INTEGER NOT NULL,
    `beds` INTEGER NOT NULL,
    `bathRooms` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `deletedAt` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ReportListing` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `reason` TEXT NOT NULL,
    `otherdetails` TEXT NOT NULL,
    `reportedBy` INTEGER NOT NULL,
    `listingId` INTEGER NOT NULL,

    INDEX `ReportListing_listingId_idx`(`listingId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `Listing_basicAboutPlaceId_key` ON `Listing`(`basicAboutPlaceId`);

-- CreateIndex
CREATE INDEX `Listing_basicAboutPlaceId_idx` ON `Listing`(`basicAboutPlaceId`);
