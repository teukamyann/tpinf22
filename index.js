const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true })); // Important pour recevoir les données du formulaire

// Import des routes
const articleRoutes = require('./article.routes');
app.use('/api/articles', articleRoutes);

app.get('/', (req, res) => {
    res.send('<h1>Bienvenue</h1><a href="/api/articles">Aller à la gestion des articles</a>');
});

app.listen(3000, () => {
    console.log("🚀 Serveur lancé sur http://localhost:3000");
});