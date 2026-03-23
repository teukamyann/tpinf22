const model = require('./article.model'); // On pointe vers le fichier model.js

exports.createArticle = (req, res) => {
    const articles = model.lire(); // Appel de la fonction du modèle
    const nouvelArticle = {
        id: Date.now().toString(),
        ...req.body,
        date: new Date().toISOString().split('T')[0]
    };
    articles.push(nouvelArticle);
    model.sauvegarder(articles);
    res.status(201).json(nouvelArticle);
};

exports.getArticles = (req, res) => {
    res.status(200).json(model.lire());
};

exports.deleteArticle = (req, res) => {
    let articles = model.lire();
    articles = articles.filter(a => a.id !== req.params.id);
    model.sauvegarder(articles);
    res.status(200).json({ message: "Supprimé" });
};
