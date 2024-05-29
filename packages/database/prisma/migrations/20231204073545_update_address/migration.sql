/*
  Warnings:

  - A unique constraint covering the columns `[peronalInfoId]` on the table `Addresses` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Addresses_peronalInfoId_key` ON `Addresses`(`peronalInfoId`);
