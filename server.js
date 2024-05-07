const express = require('express');
const bodyParser = require('body-parser');

const clientRoutes = require('./routes/clientRoutes');
const fournisseurRoutes = require('./routes/fournisseurRoutes');
const commandeRoutes = require('./routes/commandeRoutes');
const produitRoutes = require('./routes/produitRoutes');
const ligneCmdRoutes = require('./routes/ligneCommandeRoutes');
const factureRoutes = require('./routes/factureRoutes');

const app = express();

app.use(bodyParser.json());
app.use('/clients', clientRoutes);
app.use('/fournisseurs', fournisseurRoutes);
app.use('/commandes', commandeRoutes);
app.use('/produits', produitRoutes);
app.use('/ligneCommande', ligneCmdRoutes);
app.use('/factures', factureRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
