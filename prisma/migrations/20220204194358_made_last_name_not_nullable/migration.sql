/*
  Warnings:

  - Made the column `lastName` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `User` MODIFY `lastName` VARCHAR(191) NOT NULL;
