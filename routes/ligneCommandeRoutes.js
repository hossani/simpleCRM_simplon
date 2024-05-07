const express = require('express');
const router = express.Router();
const ligneCmdController = require('../controllers/ligneCommandeController');

router.get('/', ligneCmdController.getAllLigneCmd);
router.get('/:id', ligneCmdController.getLigneCmdById);
router.post('/', ligneCmdController.createLigneCmd);
router.put('/:id', ligneCmdController.updateLigneCmd);
router.delete('/:id', ligneCmdController.deleteLigneCmd);

module.exports = router;
