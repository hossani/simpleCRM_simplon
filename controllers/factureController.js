const factureModel = require('../services/factureModel');
const {PrismaClient}=require('@prisma/client');
const prism=new PrismaClient();

const getAllFacture = async (req, res) => {
    try {
        const Factures = await factureModel.getElements();
        res.json(Factures);
    } catch (error) {
        res.status(500).json({ message: error.message });  // Code de statut 500 – Internal Server Error
    } 
}

const getFactureById = async (req, res) => {
    try {
        const req_Id=parseInt(req.params.id);
        const Facture = await factureModel.getElementId(req_Id);
        if (Facture) {
            res.json(Facture);
        } else {
            res.status(404).json({ message: 'Facture not found' });  // Code de statut 404 – Not Found
        }
    } catch (error) {
        res.status(500).json({ message: error.message });  // Code de statut 500 – Internal Server Error
    }
}

const createFacture = async (req, res) => {
    try {
        const {id_cmd,TVA,echeance,id_clt,id_fourni} = req.body;
        const commande=await prism.Commande.findUnique({ where:{ id_cmd} });

        if(commande.id_clt!=id_clt) return res.status(400).json({message:"Le client ne correspond pas au numero de la commande saisie"});
        if(echeance!=undefined && echeance<=0) return res.status(400).json({message:"L'echeance doit etre un nombre positive"});
        // Récupérer toutes les lignes de commande associées à `id_cmd`
    
        const ligneCmd = await prism.ligneCommande.findMany({
            where: { id_cmd }
        });

        if(ligneCmd.length>0){
            const firstLigneCmd = ligneCmd[0];
            const existingProduct = await prism.Produit.findFirst({ where: { id_prod: firstLigneCmd.id_prod } });
        if(existingProduct.id_fourni!=id_fourni) return  res.status(400).json({ message: "Id_fournisseur n'est pas compatible avec le fournisseur de la commande" });
        }
        if (!ligneCmd) {
            return res.status(404).json({ message: "Facture not found" });
        }
        // Calculer le montant HT
        let montantHT = 0;
        let montantTTC=0;
        // Utiliser `Promise.all` pour attendre toutes les opérations asynchrones
        await Promise.all(ligneCmd.map(async (e) => {
            // Trouver le produit associé à `e.id_prod`
            const product = await prism.Produit.findUnique({
                where: { id_prod: e.id_prod }
            });

            // Si le produit est trouvé, calculer le montant HT
            if (product) {
                montantHT += e.qtecom * product.pr_vente;
            }
        }));
    if(TVA!=undefined){
     montantTTC =  montantHT * (1 + TVA);
    } else{
     montantTTC =  montantHT * (1 + 0.2);
    }
        // Créer une nouvelle facture avec les montants calculés
        const newFacture = await factureModel.createElement(req.body, montantHT, montantTTC);

        // Renvoyer la nouvelle facture avec un code de statut 201
        res.status(201).json(newFacture);
    } catch (error) {
        // Gestion des erreurs, renvoie un code de statut 500 avec le message d'erreur
        res.status(500).json({ message: error.message });
    }
}

const updateFacture = async (req, res) => {
    try {  
        const {echeance,montantHT,montantTTC,TVA,id_cmd,id_clt,id_fourni} = req.body;
        if(id_cmd!=undefined || id_clt!=undefined || id_fourni!=undefined) return res.status(400).json({message:"Vous devez pas changer ni le numero de la commande ni le numero de client ni le numero fournisseur"});
        
        if(echeance!=undefined && echeance<=0) return res.status(400).json({message:"L'echeance doit etre un nombre positive"});
        if(montantHT!=undefined || montantTTC!=undefined) return res.status(400).json({message:"Le montant HT ou TTC est en relation avec le prix de produit commandé"});
        const req_id=parseInt(req.params.id);
        const Facture = await factureModel.getElementId(req_id);
        let TTC;
        if(TVA!=undefined){
            TTC = await Facture.montantHT * (1 + TVA);
       } else{
        TTC = await Facture.montantHT * (1 + 0.2);
       }
        const updateFacture = await factureModel.updateElement(req_id, req.body,TTC);
        if (updateFacture) {
            res.json(updateFacture);
        } else {
            res.status(404).json({ message: 'Facture not found' });   // Code de statut 404 – Not Found
        }
    } catch (error) {
        res.status(500).json({ message: error.message });         // Code de statut 500 – Internal Server Error
    }
}

const deleteFacture = async (req, res) => {
    try {
        const req_Id=parseInt(req.params.id);
        const deleteFacture = await factureModel.deleteElement(req_Id);
        if (deleteFacture) {
            res.json({ message: 'Facture deleted successfully' });
        } else {
            res.status(404).json({ message: 'Facture not found' });    // Code de statut 404 – Not Found
        }
    } catch (error) {
        res.status(500).json({ message: error.message });   // Code de statut 500 – Internal Server Error
    }
}

module.exports={
    getAllFacture,
    getFactureById,
    createFacture,
    updateFacture,
    deleteFacture
}