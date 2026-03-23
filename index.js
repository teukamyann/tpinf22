const express = require('express');
const app = express();
const ctrl = require('./article.controller'); 

app.use(express.json());

// --- DESIGN ANIMÉ & PREMIUM ---
const CSS = `
    <style>
        :root { --bg: #0f172a; --card: rgba(30, 41, 59, 0.7); --accent: #38bdf8; --text: #f8fafc; }
        
        /* Arrière-plan animé (Vivant mais sobre) */
        body { 
            margin: 0; font-family: 'Inter', sans-serif; color: var(--text); 
            display: flex; flex-direction: column; align-items: center; min-height: 100vh;
            background: linear-gradient(-45deg, #0f172a, #1e293b, #0f172a, #1e1b4b);
            background-size: 400% 400%;
            animation: gradientBG 15s ease infinite;
        }
        @keyframes gradientBG { 0% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } 100% { background-position: 0% 50%; } }

        nav { width: 100%; background: rgba(15, 23, 42, 0.8); backdrop-filter: blur(10px); padding: 20px; text-align: center; border-bottom: 1px solid #334155; position: sticky; top: 0; z-index: 100; }
        nav a { color: #94a3b8; text-decoration: none; margin: 0 15px; font-size: 0.8rem; font-weight: bold; letter-spacing: 1px; transition: 0.3s; }
        nav a:hover { color: var(--accent); text-shadow: 0 0 10px var(--accent); }

        .project-title { margin-top: 40px; font-size: 0.7rem; letter-spacing: 4px; color: var(--accent); text-transform: uppercase; opacity: 0.8; }

        .card { background: var(--card); padding: 40px; border-radius: 20px; border: 1px solid rgba(255,255,255,0.1); width: 90%; max-width: 600px; backdrop-filter: blur(15px); box-shadow: 0 25px 50px -12px rgba(0,0,0,0.5); margin: 20px 0; animation: slideUp 0.6s ease-out; }
        @keyframes slideUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }

        h1 { font-size: 1.8rem; margin-bottom: 25px; font-weight: 700; text-align: center; }

        .input-group { margin-bottom: 20px; }
        label { display: block; font-size: 0.75rem; color: var(--accent); margin-bottom: 8px; font-weight: 600; }
        
        input, textarea { width: 100%; padding: 14px; background: rgba(15, 23, 42, 0.6); border: 1px solid #334155; border-radius: 12px; color: #fff; box-sizing: border-box; font-size: 1rem; transition: 0.3s; }
        input:focus, textarea:focus { outline: none; border-color: var(--accent); box-shadow: 0 0 15px rgba(56, 189, 248, 0.2); background: rgba(15, 23, 42, 0.9); }

        .btn { width: 100%; padding: 15px; border: none; border-radius: 12px; font-weight: 800; cursor: pointer; transition: 0.3s; font-size: 0.9rem; letter-spacing: 1px; }
        .btn-add { background: var(--accent); color: #0f172a; }
        .btn-add:hover { background: #7dd3fc; transform: scale(1.02); }

        .article { background: rgba(255,255,255,0.03); padding: 20px; border-radius: 15px; margin-bottom: 15px; border: 1px solid rgba(255,255,255,0.05); transition: 0.3s; }
        .article:hover { border-color: var(--accent); background: rgba(255,255,255,0.05); }
        .article b { color: var(--accent); font-size: 1.1rem; }
        .article p { color: #cbd5e1; margin: 10px 0; line-height: 1.5; }
    </style>
`;

const HEADER = `
    <div class="project-title">UE INF222 - Travail Académique de Fin n°1</div>
    <nav><a href="/">ACCUEIL</a><a href="/ajouter">AJOUTER</a><a href="/rechercher">RECHERCHER</a><a href="/supprimer">SUPPRIMER</a></nav>
`;

// --- ROUTES PAGES ---

app.get('/', (req, res) => {
    res.send(`${CSS}${HEADER}<div class="card"><h1>Fil d'Actualité</h1><div id="list"></div></div>
        <script>
            fetch('/api/articles').then(r => r.json()).then(data => {
                document.getElementById('list').innerHTML = data.reverse().map(a => \`
                    <div class="article"><b>\${a.titre}</b><p>\${a.contenu}</p><small>Par \${a.auteur} • \${a.date}</small></div>
                \`).join('');
            });
        </script>`);
});

app.get('/ajouter', (req, res) => {
    res.send(`${CSS}${HEADER}<div class="card"><h1>Publier</h1>
        <div class="input-group"><label>Titre</label><input type="text" id="t"></div>
        <div class="input-group"><label>Auteur</label><input type="text" id="a"></div>
        <div class="input-group"><label>Message</label><textarea id="c" rows="4"></textarea></div>
        <button class="btn btn-add" onclick="save()">DIFFUSER L'ARTICLE</button></div>
        <script>
            async function save() {
                const body = { titre: document.getElementById('t').value, auteur: document.getElementById('a').value, contenu: document.getElementById('c').value };
                await fetch('/api/articles', { method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(body) });
                window.location.href = '/';
            }
        </script>`);
});

app.get('/rechercher', (req, res) => {
    res.send(`${CSS}${HEADER}<div class="card"><h1>Recherche Intelligente</h1>
        <input type="text" id="q" placeholder="Rechercher par titre ou contenu..." onkeyup="search()">
        <div id="res" style="margin-top:20px"></div></div>
        <script>
            async function search() {
                const q = document.getElementById('q').value;
                if(q.length < 2) { document.getElementById('res').innerHTML = ''; return; }
                const r = await fetch('/api/articles');
                const articles = await r.json();
                // Recherche côté client pour plus de fluidité
                const filtered = articles.filter(a => 
                    a.titre.toLowerCase().includes(q.toLowerCase()) || 
                    a.contenu.toLowerCase().includes(q.toLowerCase())
                );
                document.getElementById('res').innerHTML = filtered.map(a => \`
                    <div class="article"><b>\${a.titre}</b><p>\${a.contenu.substring(0,50)}...</p></div>
                \`).join('');
            }
        </script>`);
});

app.get('/supprimer', (req, res) => {
    res.send(`${CSS}${HEADER}<div class="card"><h1>Gestion</h1><div id="list"></div></div>
        <script>
            async function load() {
                const r = await fetch('/api/articles');
                const data = await r.json();
                document.getElementById('list').innerHTML = data.map(a => \`
                    <div class="article" style="display:flex; justify-content:space-between; align-items:center;">
                        <b>\${a.titre}</b><button onclick="del('\${a.id}')" style="background:none; border:1px solid #ef4444; color:#ef4444; cursor:pointer; padding:5px 10px; border-radius:5px;">Supprimer</button>
                    </div>\`).join('');
            }
            async function del(id) {
                if(confirm('Supprimer ?')) { await fetch('/api/articles/' + id, { method: 'DELETE' }); load(); }
            }
            load();
        </script>`);
});

// --- API ROUTES ---
app.post('/api/articles', ctrl.createArticle);
app.get('/api/articles', ctrl.getArticles);
app.delete('/api/articles/:id', ctrl.deleteArticle);

app.listen(3000, () => console.log("ok http://localhost:3000"));
