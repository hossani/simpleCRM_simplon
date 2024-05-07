/*
  Warnings:

  - Added the required column `id_fourni` to the `Produit` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `produit` ADD COLUMN `id_fourni` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Produit` ADD CONSTRAINT `Produit_id_fourni_fkey` FOREIGN KEY (`id_fourni`) REFERENCES `Fournisseur`(`id_fourni`) ON DELETE RESTRICT ON UPDATE CASCADE;
