const express = require('express');
const router = express.Router();
const articleCtrl = require('./article.controller');

// Affichage et Ajout
router.get('/', articleCtrl.getArticles);
router.post('/ajouter', articleCtrl.ajouterArticleForm);

// Suppression (on utilise une route GET pour pouvoir cliquer sur un simple lien)
router.get('/delete/:id', articleCtrl.deleteArticle);

module.exports = router;