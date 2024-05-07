-- CreateTable
CREATE TABLE `Client` (
    `id_clt` INTEGER NOT NULL AUTO_INCREMENT,
    `nom` VARCHAR(100) NOT NULL,
    `prenom` VARCHAR(100) NOT NULL,
    `adresse` VARCHAR(100) NOT NULL,
    `ville` VARCHAR(100) NOT NULL,
    `telephone` VARCHAR(100) NOT NULL,
    `email` VARCHAR(100) NOT NULL,

    UNIQUE INDEX `Client_telephone_key`(`telephone`),
    UNIQUE INDEX `Client_email_key`(`email`),
    PRIMARY KEY (`id_clt`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Commande` (
    `id_cmd` INTEGER NOT NULL AUTO_INCREMENT,
    `datecom` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `id_clt` INTEGER NOT NULL,

    PRIMARY KEY (`id_cmd`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Produit` (
    `id_prod` INTEGER NOT NULL AUTO_INCREMENT,
    `pr_achat` DOUBLE NOT NULL,
    `pr_vente` DOUBLE NOT NULL,
    `taux_marge` DOUBLE NOT NULL,
    `dimension` VARCHAR(100) NULL,
    `taille` VARCHAR(100) NULL,

    PRIMARY KEY (`id_prod`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Fournisseur` (
    `id_fourni` INTEGER NOT NULL AUTO_INCREMENT,
    `nom` VARCHAR(100) NOT NULL,
    `siege_social` VARCHAR(100) NOT NULL,
    `date_creation` DATE NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `id_fiscal` VARCHAR(100) NOT NULL,
    `capital` INTEGER NOT NULL,
    `nbr_emp` INTEGER NOT NULL,
    `ville` VARCHAR(100) NOT NULL,
    `responsable` VARCHAR(100) NOT NULL,
    `telephone` VARCHAR(100) NOT NULL,
    `email` VARCHAR(100) NOT NULL,

    UNIQUE INDEX `Fournisseur_telephone_key`(`telephone`),
    UNIQUE INDEX `Fournisseur_email_key`(`email`),
    PRIMARY KEY (`id_fourni`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Facture` (
    `id_fact` INTEGER NOT NULL AUTO_INCREMENT,
    `montant` DOUBLE NOT NULL,
    `datefact` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `id_fourni` INTEGER NOT NULL,
    `id_clt` INTEGER NOT NULL,
    `id_cmd` INTEGER NOT NULL,

    UNIQUE INDEX `Facture_id_cmd_key`(`id_cmd`),
    PRIMARY KEY (`id_fact`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ligneCommande` (
    `id_ligneCmd` INTEGER NOT NULL AUTO_INCREMENT,
    `id_cmd` INTEGER NOT NULL,
    `id_prod` INTEGER NOT NULL,
    `qtecom` INTEGER NOT NULL,

    PRIMARY KEY (`id_ligneCmd`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Commande` ADD CONSTRAINT `Commande_id_clt_fkey` FOREIGN KEY (`id_clt`) REFERENCES `Client`(`id_clt`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Facture` ADD CONSTRAINT `Facture_id_cmd_fkey` FOREIGN KEY (`id_cmd`) REFERENCES `Commande`(`id_cmd`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Facture` ADD CONSTRAINT `Facture_id_fourni_fkey` FOREIGN KEY (`id_fourni`) REFERENCES `Fournisseur`(`id_fourni`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Facture` ADD CONSTRAINT `Facture_id_clt_fkey` FOREIGN KEY (`id_clt`) REFERENCES `Client`(`id_clt`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ligneCommande` ADD CONSTRAINT `ligneCommande_id_cmd_fkey` FOREIGN KEY (`id_cmd`) REFERENCES `Commande`(`id_cmd`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ligneCommande` ADD CONSTRAINT `ligneCommande_id_prod_fkey` FOREIGN KEY (`id_prod`) REFERENCES `Produit`(`id_prod`) ON DELETE RESTRICT ON UPDATE CASCADE;
