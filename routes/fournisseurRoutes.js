const express = require('express');
const router = express.Router();
const fournisseurController = require('../controllers/fournisseurController');

router.get('/', fournisseurController.getAllFournisseur);
router.get('/:id', fournisseurController.getFournisseurById);
router.post('/', fournisseurController.createFournisseur);
router.put('/:id', fournisseurController.updateFournisseur);
router.delete('/:id', fournisseurController.deleteFournisseur);

module.exports = router;
