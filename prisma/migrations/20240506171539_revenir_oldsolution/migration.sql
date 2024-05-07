/*
  Warnings:

  - You are about to drop the column `id_fourni` on the `produit` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `produit` DROP FOREIGN KEY `Produit_id_fourni_fkey`;

-- AlterTable
ALTER TABLE `produit` DROP COLUMN `id_fourni`;
