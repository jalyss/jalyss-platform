/*
  Warnings:

  - Added the required column `client_email` to the `Command` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Command" ADD COLUMN     "client_email" TEXT NOT NULL;
