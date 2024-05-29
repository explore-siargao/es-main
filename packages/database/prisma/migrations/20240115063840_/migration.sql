/*
  Warnings:

  - You are about to drop the column `listingId` on the `HighLights` table. All the data in the column will be lost.
  - You are about to alter the column `latitude` on the `Listing` table. The data in that column could be lost. The data in that column will be cast from `Decimal(10,0)` to `Decimal`.
  - You are about to alter the column `longitude` on the `Listing` table. The data in that column could be lost. The data in that column will be cast from `Decimal(10,0)` to `Decimal`.

*/
-- DropIndex
DROP INDEX `HighLights_listingId_idx` ON `HighLights`;

-- AlterTable
ALTER TABLE `HighLights` DROP COLUMN `listingId`;

-- AlterTable
ALTER TABLE `Listing` MODIFY `latitude` DECIMAL NULL,
    MODIFY `longitude` DECIMAL NULL;

-- CreateTable
CREATE TABLE `ListingHighLights` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `listingId` INTEGER NOT NULL,
    `highLightsId` INTEGER NOT NULL,

    INDEX `ListingHighLights_listingId_idx`(`listingId`),
    INDEX `ListingHighLights_highLightsId_idx`(`highLightsId`),
    UNIQUE INDEX `ListingHighLights_listingId_highLightsId_key`(`listingId`, `highLightsId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
