/*
  Warnings:

  - You are about to drop the `taxes` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `country` to the `PersonalInfo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `currency` to the `PersonalInfo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `language` to the `PersonalInfo` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `PersonalInfo` ADD COLUMN `country` VARCHAR(100) NOT NULL,
    ADD COLUMN `currency` VARCHAR(10) NOT NULL,
    ADD COLUMN `language` VARCHAR(50) NOT NULL;

-- AlterTable
ALTER TABLE `User` ADD COLUMN `taxId` INTEGER NULL;

-- DropTable
DROP TABLE `taxes`;

-- CreateTable
CREATE TABLE `Tax` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `countryRegion` VARCHAR(255) NOT NULL,
    `vatId` VARCHAR(255) NOT NULL,
    `nameOnRegistration` VARCHAR(255) NOT NULL,
    `addressLine1` VARCHAR(255) NOT NULL,
    `addressLine2` VARCHAR(255) NOT NULL,
    `city` VARCHAR(255) NOT NULL,
    `provinceRegion` VARCHAR(255) NOT NULL,
    `zipPostalCode` VARCHAR(255) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `deletedAt` DATETIME(3) NULL,
    `userId` INTEGER NULL,

    UNIQUE INDEX `Tax_userId_key`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
