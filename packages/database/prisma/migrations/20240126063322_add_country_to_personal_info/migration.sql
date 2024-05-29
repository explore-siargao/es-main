/*
  Warnings:

  - Added the required column `country` to the `PersonalInfo` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `PersonalInfo` ADD COLUMN `country` VARCHAR(100) NOT NULL;
