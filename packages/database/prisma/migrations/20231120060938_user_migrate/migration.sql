-- AlterTable
ALTER TABLE `User` ADD COLUMN `registrationType` ENUM('Manual', 'Facebook', 'Google') NULL,
    MODIFY `password` VARCHAR(255) NULL;
