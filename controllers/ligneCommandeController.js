const ligneCmdModel = require('../services/ligneCommandeModel');
const {PrismaClient}=require('@prisma/client');
const prism=new PrismaClient();

const getAllLigneCmd = async (req, res) => {
    try {
        const LigneCmd = await ligneCmdModel.getElements();
        res.json(LigneCmd);
    } catch (error) {
        res.status(500).json({ message: error.message });  // Code de statut 500 – Internal Server Error
    }
}

const getLigneCmdById = async (req, res) => {
    try {
        const req_Id=parseInt(req.params.id);
        const LigneCmd = await ligneCmdModel.getElementId(req_Id);
        if (LigneCmd) {
            res.json(LigneCmd);
        } else {
            res.status(404).json({ message: 'Ligne commande not found' });  // Code de statut 404 – Not Found
        }
    } catch (error) {
        res.status(500).json({ message: error.message });  // Code de statut 500 – Internal Server Error
    }
}

const createLigneCmd = async (req, res) => {
    try {
        const { qtecom, id_cmd, id_prod } = req.body;
      
        // Vérifiez si qtecom est une quantité positive
        if (qtecom!= undefined && qtecom <= 0) {
            return res.status(400).json({ message: 'La quantité de la commande doit être un nombre positif et superieure à zero' });
        }
        // Obtenez toutes les lignes de commande liées à id_cmd
        const firstLigneCmd = await prism.ligneCommande.findFirst({  where: { id_cmd } });

        // Obtenez le produit que vous voulez ajouter
        const newProduct = await prism.Produit.findFirst({ where: { id_prod } });

        // Vérifiez le fournisseur des produits existants et du nouveau produit
        if (firstLigneCmd) {
            const existingProduct = await prism.Produit.findFirst({ where: { id_prod: firstLigneCmd.id_prod } });

            // Si le fournisseur du nouveau produit est différent des produits existants dans la commande
            if (newProduct.id_fourni !== existingProduct.id_fourni) {
                return res.status(400).json({ message: 'La commande doit contenir des produits d\'un seul fournisseur' });
            }
        }

        // Si la vérification est réussie, créez la nouvelle ligne de commande
        const newLigneCmd = await ligneCmdModel.createElement(req.body);

        // Renvoyez la nouvelle ligne de commande avec un code de statut 201
        res.status(201).json(newLigneCmd);
    } catch (error) {
        // Gestion des erreurs
        res.status(500).json({ message: error.message });
    }
}

const updateLigneCmd = async (req, res) => {
    try {
        const {qtecom,id_cmd,id_prod}=req.body;
        if(id_cmd!=undefined || id_prod!=undefined) return res.status(400).json({message:'Vous devez pas modifier id commande ou produit'});
        if(qtecom!= undefined && qtecom<=0) return res.status(400).json({message:'La quantite de la commande doit etre nbr positive et superieure à zero'});
        const req_id=parseInt(req.params.id);
        const updateLigneCmd = await ligneCmdModel.updateElement(req_id, req.body);
        if (updateLigneCmd) {
            res.json(updateLigneCmd);
        } else {
            res.status(404).json({ message: 'Ligne commande not found' });   // Code de statut 404 – Not Found
        }
    } catch (error) {
        res.status(500).json({ message: error.message });         // Code de statut 500 – Internal Server Error
    }
}

const deleteLigneCmd = async (req, res) => {
    try {
        const req_Id=parseInt(req.params.id);
        const deleteLigneCmd = await ligneCmdModel.deleteElement(req_Id);
        if (deleteLigneCmd) {
            res.json({ message: 'Ligne commande deleted successfully' });
        } else {
            res.status(404).json({ message: 'Ligne commande not found' });    // Code de statut 404 – Not Found
        }
    } catch (error) {
        res.status(500).json({ message: error.message });   // Code de statut 500 – Internal Server Error
    }
}

module.exports={
    getAllLigneCmd,
    getLigneCmdById,
    createLigneCmd,
    updateLigneCmd,
    deleteLigneCmd
}