const express = require('express');
const router = express.Router();
const ctrl = require('./article.controller');

router.post('/', ctrl.createArticle);          // Créer
router.get('/', ctrl.getArticles);            // Lire tout
router.get('/search', ctrl.search);            // Chercher
router.get('/:id', ctrl.getArticleById);       // Lire un seul
router.put('/:id', ctrl.updateArticle);        // Modifier
router.delete('/:id', ctrl.deleteArticle);     // Supprimer

module.exports = router;
