// Structure d'un article selon le sujet [cite: 45]
class Article {
    constructor(id, titre, contenu, auteur, categorie, tags) {
        this.id = id;
        this.titre = titre;
        this.contenu = contenu;
        this.auteur = auteur; // Obligatoire [cite: 101]
        this.categorie = categorie;
        this.tags = tags;
        this.date = new Date().toISOString();
    }
}

module.exports = Article;