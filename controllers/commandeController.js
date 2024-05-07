const commandeModel = require('../services/commandeModel');

const getAllCommandes = async (req, res) => {
    try {
        const commandes = await commandeModel.getElements();
        res.json(commandes);
    } catch (error) {
        res.status(500).json({ message: error.message });  // Code de statut 500 – Internal Server Error
    }
};

const getCommandeById = async (req, res) => {
    try {
        const req_Id=parseInt(req.params.id);
        const commande = await commandeModel.getElementId(req_Id);
        if (commande) {
            res.json(commande);
        } else {
            res.status(404).json({ message: 'Commande not found' });  // Code de statut 404 – Not Found
        }
    } catch (error) {
        res.status(500).json({ message: error.message });  // Code de statut 500 – Internal Server Error
    }
}

const createCommande = async (req, res) => {
    try {
        const newCommande = await commandeModel.createElement(req.body);
        res.status(201).json(newCommande);                         //Code de statut 201 – Created
    } catch (error) {
        res.status(500).json({ message: error.message });           // Code de statut 500 – Internal Server Error
    } 
}

const updateCommande = async (req, res) => {
    try {  
        const req_Id=parseInt(req.params.id);
        const updateCommande = await commandeModel.updateElement(req_Id, req.body);
        if (updateCommande) {
            res.json(updateCommande);
        } else {
            res.status(404).json({ message: 'Commande not found' });   // Code de statut 404 – Not Found
        }
    } catch (error) {
        res.status(500).json({ message: error.message });         // Code de statut 500 – Internal Server Error
    }
}

const deleteCommande = async (req, res) => {
    try {
        const req_Id=parseInt(req.params.id);
        const deleteCommande = await commandeModel.deleteElement(req_Id);
        if (deleteCommande) {
            res.json({ message: 'Commande deleted successfully' });
        } else {
            res.status(404).json({ message: 'Commande not found' });    // Code de statut 404 – Not Found
        }
    } catch (error) {
        res.status(500).json({ message: error.message });   // Code de statut 500 – Internal Server Error
    }
}

module.exports={
    getAllCommandes,
    getCommandeById,
    createCommande,
    updateCommande,
    deleteCommande
}