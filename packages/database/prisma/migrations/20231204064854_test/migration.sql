-- AlterTable
ALTER TABLE `Addresses` MODIFY `address` LONGTEXT NULL;

-- AlterTable
ALTER TABLE `EmergencyContacts` MODIFY `email` VARCHAR(50) NULL,
    MODIFY `phoneNumber` VARCHAR(20) NULL;
