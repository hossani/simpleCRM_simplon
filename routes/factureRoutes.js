const express = require('express');
const router = express.Router();
const factureController = require('../controllers/factureController');

router.get('/', factureController.getAllFacture);
router.get('/:id', factureController.getFactureById);
router.post('/', factureController.createFacture);
router.put('/:id', factureController.updateFacture);
router.delete('/:id', factureController.deleteFacture);

module.exports = router;
