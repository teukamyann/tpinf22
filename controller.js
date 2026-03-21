let articles = [];

exports.getArticles = (req, res) => {
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    
    let html = `
    <div style="font-family: sans-serif; max-width: 600px; margin: auto; padding: 20px;">
        <h2>📝 Mon Blog INF222</h2>
        
        <div style="background: #f9f9f9; padding: 15px; border: 1px solid #ddd; border-radius: 8px; margin-bottom: 20px;">
            <form action="/api/articles/ajouter" method="POST">
                <input type="text" name="titre" placeholder="Titre" required style="width:100%; margin-bottom:10px; padding:8px;">
                <input type="text" name="auteur" placeholder="Auteur" required style="width:100%; margin-bottom:10px; padding:8px;">
                <textarea name="contenu" placeholder="Contenu" style="width:100%; margin-bottom:10px; padding:8px;"></textarea>
                <button type="submit" style="background: #27ae60; color: white; border: none; padding: 10px; cursor: pointer; width: 100%; border-radius: 5px;">PUBLIER</button>
            </form>
        </div>

        <hr>
        <h3>Liste des publications</h3>
    `;

    if (articles.length === 0) {
        html += "<p>Aucun article.</p>";
    } else {
        for (let i = 0; i < articles.length; i++) {
            html += `
            <div style="border: 1px solid #eee; padding: 15px; margin-bottom: 10px; border-left: 4px solid #3498db; position: relative;">
                <h4 style="margin: 0;">${articles[i].titre}</h4>
                <p style="margin: 5px 0;">${articles[i].contenu}</p>
                <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 10px;">
                    <span style="font-size: 0.8em; color: gray;">Par ${articles[i].auteur}</span>
                    <a href="/api/articles/delete/${i}" 
                       style="background: #e74c3c; color: white; text-decoration: none; padding: 5px 10px; border-radius: 3px; font-size: 0.8em;"
                       onclick="return confirm('Supprimer cet article ?')">
                       Supprimer
                    </a>
                </div>
            </div>`;
        }
    }

    html += `</div>`;
    res.send(html);
};

// Ajouter
exports.ajouterArticleForm = (req, res) => {
    const { titre, auteur, contenu } = req.body;
    articles.push({ titre, auteur, contenu, date: new Date() });
    res.redirect('/api/articles');
};

// Supprimer (Par index)
exports.deleteArticle = (req, res) => {
    const id = req.params.id;
    if (articles[id] !== undefined) {
        articles.splice(id, 1); // Retire l'article du tableau
    }
    res.redirect('/api/articles'); // Rafraîchit la page
};
