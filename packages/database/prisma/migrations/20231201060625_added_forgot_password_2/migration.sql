/*
  Warnings:

  - You are about to drop the column `expriredAt` on the `ForgotPassword` table. All the data in the column will be lost.
  - Added the required column `expiredAt` to the `ForgotPassword` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `ForgotPassword` DROP COLUMN `expriredAt`,
    ADD COLUMN `expiredAt` DATETIME(3) NOT NULL;
