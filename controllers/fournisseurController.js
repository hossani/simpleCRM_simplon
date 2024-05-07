const fournisseurModel = require('../services/fournisseurModel');

const getAllFournisseur = async (req, res) => {
    try {
        const fournisseurs = await fournisseurModel.getElements();
        res.json(fournisseurs);
    } catch (error) {
        res.status(500).json({ message: error.message });  // Code de statut 500 – Internal Server Error
    }
};

const getFournisseurById = async (req, res) => {
    try {
        const req_Id=parseInt(req.params.id);
        const fournisseur = await fournisseurModel.getElementId(req_Id);
        if (fournisseur) {
            res.json(fournisseur);
        } else {
            res.status(404).json({ message: 'Fournisseur not found' });  // Code de statut 404 – Not Found
        }
    } catch (error) {
        res.status(500).json({ message: error.message });  // Code de statut 500 – Internal Server Error
    }
}

const createFournisseur = async (req, res) => {
    try {
        const phoneRegex = /^0([5-7])\d{8}$/;
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,3}$/;
        const {capital,nbr_emp,telephone,email}=req.body;
        if(nbr_emp!=undefined && nbr_emp<=0){
            return res.status(400).json({message:"Le nombre d'employés doit etre superieur à zero"}); //code de statut HTTP 400 (Bad Request)
        }
        if(capital!=undefined && capital<=0){
            return res.status(400).json({message:"Le capital doit etre superieur à zero"}); //code de statut HTTP 400 (Bad Request)
        }
        if(telephone!=undefined && !phoneRegex.test(telephone)){
            return res.status(400).json({message:"Numero telephone doit etre en format valide"});
        }
        if(email!=undefined && !emailRegex.test(email)){
            return res.status(400).json({message:"Email doit etre en format valide"});
        }
        const newFournisseur = await fournisseurModel.createElement(req.body);
        res.status(201).json(newFournisseur);                         //Code de statut 201 – Created
    } catch (error) {
        res.status(500).json({ message: error.message });           // Code de statut 500 – Internal Server Error
    } 
}

const updateFournisseur = async (req, res) => {
    try {
        const phoneRegex = /^0([5-7])\d{8}$/;
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,3}$/;
        const {capital,nbr_emp,telephone,email}=req.body;
        if(nbr_emp!=undefined && nbr_emp<=0){
            return res.status(400).json({message:"Le nombre d'employés doit etre superieur à zero"}); //code de statut HTTP 400 (Bad Request)
        }
        if(capital!=undefined && capital<=0 ){
            return res.status(400).json({message:"Le capital doit etre superieur à zero"}); //code de statut HTTP 400 (Bad Request)
        }
        if(telephone!=undefined && !phoneRegex.test(telephone)){
            return res.status(400).json({message:"Numero telephone doit etre en format valide"}); //code de statut HTTP 400 (Bad Request)
        }
        if(email!=undefined && !emailRegex.test(email)){
            return res.status(400).json({message:"Email doit etre en format valide"}); //code de statut HTTP 400 (Bad Request)
        }
        const req_Id=parseInt(req.params.id);
        const updateFounrisseur = await fournisseurModel.updateElement(req_Id, req.body);

        if (updateFounrisseur) {
            res.json(updateFounrisseur);
        } else {
            res.status(404).json({ message: 'Fournisseur not found' });   // Code de statut 404 – Not Found
        }
    } catch (error) {
        res.status(500).json({ message: error.message });         // Code de statut 500 – Internal Server Error
    }
}

const deleteFournisseur = async (req, res) => {
    try {
        const req_Id=parseInt(req.params.id);
        const deletedFounrisseur = await fournisseurModel.deleteElement(req_Id);
        if (deletedFounrisseur) {
            res.json({ message: 'Fournisseur deleted successfully' });
        } else {
            res.status(404).json({ message: 'Fournisseur not found' });    // Code de statut 404 – Not Found
        }
    } catch (error) {
        res.status(500).json({ message: error.message });   // Code de statut 500 – Internal Server Error
    }
}

module.exports={
    getAllFournisseur,
    getFournisseurById,
    createFournisseur,
    updateFournisseur,
    deleteFournisseur
}