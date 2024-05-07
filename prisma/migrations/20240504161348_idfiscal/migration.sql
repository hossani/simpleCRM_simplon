/*
  Warnings:

  - A unique constraint covering the columns `[id_fiscal]` on the table `Fournisseur` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Fournisseur_id_fiscal_key` ON `Fournisseur`(`id_fiscal`);
