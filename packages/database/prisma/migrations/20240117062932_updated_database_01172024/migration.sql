/*
  Warnings:

  - You are about to drop the column `description` on the `CancellationPolicy` table. All the data in the column will be lost.
  - You are about to alter the column `latitude` on the `Listing` table. The data in that column could be lost. The data in that column will be cast from `Decimal(10,0)` to `Decimal`.
  - You are about to alter the column `longitude` on the `Listing` table. The data in that column could be lost. The data in that column will be cast from `Decimal(10,0)` to `Decimal`.
  - You are about to drop the column `houseRuleid` on the `Rule` table. All the data in the column will be lost.
  - You are about to drop the column `safetyPropertyId` on the `Rule` table. All the data in the column will be lost.
  - You are about to drop the `HouseRules` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `SafetyAndProperty` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ThingsToKnow` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `listingId` to the `CancellationPolicy` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `Rule` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `Rule_houseRuleid_idx` ON `Rule`;

-- DropIndex
DROP INDEX `Rule_safetyPropertyId_idx` ON `Rule`;

-- AlterTable
ALTER TABLE `CancellationPolicy` DROP COLUMN `description`,
    ADD COLUMN `listingId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `Listing` MODIFY `latitude` DECIMAL NULL,
    MODIFY `longitude` DECIMAL NULL;

-- AlterTable
ALTER TABLE `Rule` DROP COLUMN `houseRuleid`,
    DROP COLUMN `safetyPropertyId`,
    ADD COLUMN `cancellationPolicyId` INTEGER NULL,
    ADD COLUMN `description` VARCHAR(191) NOT NULL,
    ADD COLUMN `houseRuleId` INTEGER NULL,
    ADD COLUMN `safePropertyId` INTEGER NULL;

-- DropTable
DROP TABLE `HouseRules`;

-- DropTable
DROP TABLE `SafetyAndProperty`;

-- DropTable
DROP TABLE `ThingsToKnow`;

-- CreateTable
CREATE TABLE `HouseRule` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NOT NULL,
    `listingId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `deletedAt` DATETIME(3) NULL,

    INDEX `HouseRule_listingId_idx`(`listingId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `SafetyProperty` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NOT NULL,
    `listingId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `deletedAt` DATETIME(3) NULL,

    INDEX `SafetyProperty_listingId_idx`(`listingId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE INDEX `CancellationPolicy_listingId_idx` ON `CancellationPolicy`(`listingId`);

-- CreateIndex
CREATE INDEX `Rule_houseRuleId_idx` ON `Rule`(`houseRuleId`);

-- CreateIndex
CREATE INDEX `Rule_cancellationPolicyId_idx` ON `Rule`(`cancellationPolicyId`);

-- CreateIndex
CREATE INDEX `Rule_safePropertyId_idx` ON `Rule`(`safePropertyId`);
