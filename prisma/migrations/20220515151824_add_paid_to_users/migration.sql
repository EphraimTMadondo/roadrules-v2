/*
  Warnings:

  - You are about to alter the column `cost` on the `drivingschools` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Decimal(19,2)`.

*/
-- AlterTable
ALTER TABLE `drivingschools` MODIFY `cost` DECIMAL(19, 2) NOT NULL;

-- AlterTable
ALTER TABLE `notes` ADD COLUMN `description` VARCHAR(800) NOT NULL DEFAULT '';

-- AlterTable
ALTER TABLE `users` ADD COLUMN `paid` BOOLEAN NOT NULL DEFAULT false;
