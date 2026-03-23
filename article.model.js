const fs = require('fs');
const FILE = './articles.json';

const lire = () => {
    if (!fs.existsSync(FILE)) return [];
    return JSON.parse(fs.readFileSync(FILE, 'utf-8') || "[]");
};

const sauvegarder = (data) => {
    fs.writeFileSync(FILE, JSON.stringify(data, null, 2));
};

// C'est cette ligne qui manquait ou qui bloquait :
module.exports = { lire, sauvegarder };
