 Blog Management System - UE INF222 (TAF 1)

Ce projet est une application web **Full-Stack** minimaliste développée dans le cadre de l'Unité d'Enseignement **INF222**. Il permet de gérer un flux d'articles via une architecture **API REST** robuste, stockée sur un système de fichiers JSON.


 Fonctionnalités

L'application implémente un cycle **CRUD** (Create, Read, Delete) complet avec une interface utilisateur moderne :

  Dashboard Dynamique** : Visualisation en temps réel des articles publiés.
  Système de Publication** : Formulaire de création d'articles avec validation.
  Moteur de Recherche** : Recherche instantanée par mot-clé (titre ou contenu).
  gestion des Suppressions : Possibilité de retirer des articles de la base de données.
  Design Premium : Interface en *Dark Mode* avec arrière-plan animé (CSS Gradients) et transitions fluides.

---

 Technologies Utilisées

 -Backend: Node.js & Framework Express.
-frontend : HTML5 / CSS3 (Animations Keyframes) / JavaScript (Fetch API).
-Stockage : Fichier JSON (Persistance des données en local).
-Architecture : Modèle-Vue-Contrôleur (MVC) simplifié pour une meilleure séparation des préoccupations.

---

##  Installation et Lancement

1.  -Cloner ou extraire le projet** dans votre dossier de travail.
2.  **Installer les dépendances** (si nécessaire) :
    -bash
    npm install
    
3.  -Lancer le serveur** :
    -bash
    node app.js
    
4.  Accéder à l'application via votre navigateur :
    [http://localhost:3000](http://localhost:3000)

---

##  Structure du Projet

  -app.js` : Point d'entrée, configuration d'Express et routage des pages.
  -controller.js` : Logique métier (traitement des requêtes API).
  -model.js` : Gestion de la lecture/écriture dans le fichier de données.
  -articles.json` : Base de données locale au format JSON.
  -README.md` : Documentation du projet.

---


-[TEUKAM YANN]  
-Matricule :** [24H2556]  
-Date :** 23 Mars 2026
