const produitModel = require('../services/produitModel');

const getAllProduits = async (req, res) => {
    try {
        const produits = await produitModel.getElements();
        res.json(produits);
    } catch (error) {
        res.status(500).json({ message: error.message });  // Code de statut 500 – Internal Server Error
    }
};

const getProduitById = async (req, res) => {
    try {
        const req_Id=parseInt(req.params.id);
        const produit = await produitModel.getElementId(req_Id);
        if (produit) {
            res.json(produit);
        } else {
            res.status(404).json({ message: 'Produit not found' });  // Code de statut 404 – Not Found
        }
    } catch (error) {
        res.status(500).json({ message: error.message });  // Code de statut 500 – Internal Server Error
    }
}

const createProduit = async (req, res) => {
    try {
        const {pr_achat,pr_vente}=req.body;
        if(pr_achat==undefined || pr_vente==undefined || pr_achat<=0 || pr_vente<=0) return res.status(400).json({message:"Soit le prix de vente ou achat est undefined ou bien negative"});
        const taux_marge=(pr_vente-pr_achat)/pr_achat;
        const newProduit = await produitModel.createElement(req.body,taux_marge);
        res.status(201).json(newProduit);                         //Code de statut 201 – Created
    } catch (error) {
        res.status(500).json({ message: error.message });           // Code de statut 500 – Internal Server Error
    } 
}

const updateProduit = async (req, res) => {
    try {
        const {pr_achat,pr_vente}=req.body;
       const req_Id=parseInt(req.params.id);
       const Produit= await produitModel.getElementId(req_Id);
       let taux_marge=0;
       
       if(pr_achat!=undefined && pr_vente!=undefined){
        if(pr_achat<=0 || pr_vente<=0){
            return res.status(400).json({message:'Le prix achat ou bien de vente est negative'});
        }
          taux_marge= (pr_vente-pr_achat)/pr_achat;
       }else if(pr_achat!=undefined){
        if(pr_achat<=0 ){
            return res.status(400).json({message:'Le prix achat est negative'});
        }
        taux_marge= (Produit.pr_vente-pr_achat)/pr_achat;
       }
       else if(pr_vente!=undefined){
    if(pr_vente<=0 ){
        return res.status(400).json({message:'Le prix vente est negative'});
    }
    taux_marge= (pr_vente-Produit.pr_achat)/Produit.pr_achat;
}
        const updateProduit = await produitModel.updateElement(req_Id, req.body,taux_marge);
        if (updateProduit) {
            res.json(updateProduit);
        } else {
            res.status(404).json({ message: 'Produit not found' });   // Code de statut 404 – Not Found
        }
    } catch (error) {
        res.status(500).json({ message: error.message });         // Code de statut 500 – Internal Server Error
    }
}

const deleteProduit = async (req, res) => {
    try {
        const req_Id=parseInt(req.params.id);
        const deleteProduit = await produitModel.deleteElement(req_Id);
        if (deleteProduit) {
            res.json({ message: 'Produit deleted successfully' });
        } else {
            res.status(404).json({ message: 'Produit not found' });    // Code de statut 404 – Not Found
        }
    } catch (error) {
        res.status(500).json({ message: error.message });   // Code de statut 500 – Internal Server Error
    }
}

module.exports={
    getAllProduits,
    getProduitById,
    createProduit,
    updateProduit,
    deleteProduit
}