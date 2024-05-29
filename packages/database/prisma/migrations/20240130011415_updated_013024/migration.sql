/*
  Warnings:

  - You are about to drop the column `governMentId` on the `personalinfo` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `personalinfo` DROP COLUMN `governMentId`,
    ADD COLUMN `governmentId` VARCHAR(255) NULL;
