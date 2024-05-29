/*
  Warnings:

  - You are about to drop the column `description` on the `listing` table. All the data in the column will be lost.
  - You are about to drop the column `governMentId` on the `personalinfo` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[descriptionId]` on the table `Listing` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `listing` DROP COLUMN `description`,
    ADD COLUMN `descriptionId` INTEGER NULL;

-- AlterTable
ALTER TABLE `personalinfo` DROP COLUMN `governMentId`,
    ADD COLUMN `governmentId` VARCHAR(255) NULL;

-- CreateTable
CREATE TABLE `ListingDescription` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `generalDescription` LONGTEXT NOT NULL,
    `aboutSpace` LONGTEXT NULL,
    `aboutGuestAccess` LONGTEXT NULL,
    `otherThingsNote` LONGTEXT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `deletedAt` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `Listing_descriptionId_key` ON `Listing`(`descriptionId`);
