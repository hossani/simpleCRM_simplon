const clientModel = require('../services/clientModel');

const getAllClients = async (req, res) => {
    try {
        const clients = await clientModel.getElements();
        res.json(clients);
    } catch (error) {
        res.status(500).json({ message: error.message });  // Code de statut 500 – Internal Server Error
    }
};

const getClientById = async (req, res) => {
    try {
        const req_Id=parseInt(req.params.id);
        const client = await clientModel.getElementId(req_Id);
        if (client) {
            res.json(client);
        } else {
            res.status(404).json({ message: 'Client not found' });  // Code de statut 404 – Not Found
        }
    } catch (error) {
        res.status(500).json({ message: error.message });  // Code de statut 500 – Internal Server Error
    }
}

const createClient = async (req, res) => {
    try {
        const phoneRegex = /^0([5-7])\d{8}$/;  
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,3}$/;
        const {telephone,email}=req.body;

        if(telephone!=undefined && !phoneRegex.test(telephone)){
            return res.status(400).json({message:"Numero telephone doit etre en format valide"});
        }
        if(email!=undefined && !emailRegex.test(email)){
            return res.status(400).json({message:"Email doit etre en format valide"});
        }

        const newClient = await clientModel.createElement(req.body);
        res.status(201).json(newClient);                         //Code de statut 201 – Created
    } catch (error) {
        res.status(500).json({ message: error.message });           // Code de statut 500 – Internal Server Error
    } 
}

const updateClient = async (req, res) => {
    try {
        const phoneRegex = /^0([5-7])\d{8}$/;
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,3}$/;
        const {telephone,email}=req.body;

        if(telephone!=undefined && !phoneRegex.test(telephone)){
            return res.status(400).json({message:"Numero telephone doit etre en format valide"});
        }
        if(email!=undefined && !emailRegex.test(email)){
            return res.status(400).json({message:"Email doit etre en format valide"});
        }
        const req_Id=parseInt(req.params.id);
        const updatedClient = await clientModel.updateElement(req_Id, req.body);
        if (updatedClient) {
            res.json(updatedClient);
        } else {
            res.status(404).json({ message: 'Client not found' });   // Code de statut 404 – Not Found
        }
    } catch (error) {
        res.status(500).json({ message: error.message });         // Code de statut 500 – Internal Server Error
    }
}

const deleteClient = async (req, res) => {
    try {
        const req_Id=parseInt(req.params.id);
        const deletedClient = await clientModel.deleteElement(req_Id);
        if (deletedClient) {
            res.json({ message: 'Client deleted successfully' });
        } else {
            res.status(404).json({ message: 'Client not found' });    // Code de statut 404 – Not Found
        }
    } catch (error) {
        res.status(500).json({ message: error.message });   // Code de statut 500 – Internal Server Error
    }
}

module.exports={
    getAllClients,
    getClientById,
    createClient,
    updateClient,
    deleteClient
}