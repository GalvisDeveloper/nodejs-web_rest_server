/*
  Warnings:

  - Made the column `completedAt` on table `todo` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "todo" ALTER COLUMN "completedAt" SET NOT NULL;
