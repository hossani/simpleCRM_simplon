/*
  Warnings:

  - You are about to drop the column `montant` on the `facture` table. All the data in the column will be lost.
  - Added the required column `adresse` to the `Facture` table without a default value. This is not possible if the table is not empty.
  - Added the required column `echeance` to the `Facture` table without a default value. This is not possible if the table is not empty.
  - Added the required column `montantHT` to the `Facture` table without a default value. This is not possible if the table is not empty.
  - Added the required column `montantTTC` to the `Facture` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `facture` DROP COLUMN `montant`,
    ADD COLUMN `TVA` DOUBLE NOT NULL DEFAULT 0.2,
    ADD COLUMN `adresse` VARCHAR(100) NOT NULL,
    ADD COLUMN `echeance` INTEGER NOT NULL,
    ADD COLUMN `montantHT` DOUBLE NOT NULL,
    ADD COLUMN `montantTTC` DOUBLE NOT NULL;
