/*
  Warnings:

  - You are about to drop the column `address` on the `Addresses` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Addresses` DROP COLUMN `address`,
    ADD COLUMN `city` LONGTEXT NULL,
    ADD COLUMN `province` LONGTEXT NULL,
    ADD COLUMN `streetAddress` LONGTEXT NULL,
    ADD COLUMN `zipCode` INTEGER NULL;
