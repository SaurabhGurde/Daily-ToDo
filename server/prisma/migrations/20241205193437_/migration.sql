/*
  Warnings:

  - A unique constraint covering the columns `[taskId,date]` on the table `TaskCompletion` will be added. If there are existing duplicate values, this will fail.
  - Made the column `date` on table `TaskCompletion` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "TaskCompletion" ALTER COLUMN "date" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "TaskCompletion_taskId_date_key" ON "TaskCompletion"("taskId", "date");
