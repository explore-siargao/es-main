-- CreateTable
CREATE TABLE `taxes` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `countryRegion` VARCHAR(255) NOT NULL,
    `vatId` VARCHAR(255) NOT NULL,
    `nameOnRegistration` VARCHAR(255) NOT NULL,
    `addressLine1` VARCHAR(255) NOT NULL,
    `addressLine2` VARCHAR(255) NOT NULL,
    `city` VARCHAR(255) NOT NULL,
    `provinceRegion` VARCHAR(255) NOT NULL,
    `zipPostalCode` VARCHAR(255) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `deletedAt` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
