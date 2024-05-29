/*
  Warnings:

  - You are about to drop the column `rates` on the `review` table. All the data in the column will be lost.
  - Added the required column `accuracyRates` to the `Review` table without a default value. This is not possible if the table is not empty.
  - Added the required column `checkInRates` to the `Review` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cleanLinessRates` to the `Review` table without a default value. This is not possible if the table is not empty.
  - Added the required column `communicationRates` to the `Review` table without a default value. This is not possible if the table is not empty.
  - Added the required column `locationRates` to the `Review` table without a default value. This is not possible if the table is not empty.
  - Added the required column `valueRates` to the `Review` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `review` DROP COLUMN `rates`,
    ADD COLUMN `accuracyRates` INTEGER NOT NULL,
    ADD COLUMN `checkInRates` INTEGER NOT NULL,
    ADD COLUMN `cleanLinessRates` INTEGER NOT NULL,
    ADD COLUMN `communicationRates` INTEGER NOT NULL,
    ADD COLUMN `locationRates` INTEGER NOT NULL,
    ADD COLUMN `valueRates` INTEGER NOT NULL;
