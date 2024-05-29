/*
  Warnings:

  - You are about to drop the column `listingId` on the `WishGroup` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX `WishGroup_listingId_idx` ON `WishGroup`;

-- AlterTable
ALTER TABLE `WishGroup` DROP COLUMN `listingId`;

-- CreateTable
CREATE TABLE `_ListingToWishGroup` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_ListingToWishGroup_AB_unique`(`A`, `B`),
    INDEX `_ListingToWishGroup_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
