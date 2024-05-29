/*
  Warnings:

  - Added the required column `language` to the `PersonalInfo` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `PersonalInfo` ADD COLUMN `language` VARCHAR(50) NOT NULL;
