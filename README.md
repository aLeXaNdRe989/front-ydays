Altern’ Work – Interface utilisateur
Ce dépôt contient l’interface client de la plateforme Altern’ Work. Il s’agit d’une application web construite avec React 18 et Vite, stylisée à l’aide de Tailwind CSS et utilisant Leaflet pour afficher la localisation des entreprises sur une carte.

Fonctionnalités principales
Authentification : formulaires d’inscription et de connexion pour les étudiants, les entreprises et les administrateurs.

Consultation des entreprises : affichage des sociétés sur une carte interactive et dans une liste, avec filtres par secteur ou type de contrat.

Gestion du profil : page personnelle permettant de modifier ses informations, déposer un avis et télécharger un CV.

Navigation protégée : les routes sont sécurisées et redirigent vers la page d’authentification en l’absence de jeton.

Prérequis
Node.js (version 18 ou supérieure).

npm ou yarn pour gérer les dépendances.

Installation
Clonez le dépôt :

bash
Copier
Modifier
git clone https://github.com/aLeXaNdRe989/front-ydays.git
cd front-ydays
Installez les dépendances :

bash
Copier
Modifier
npm install
Créez un fichier .env à la racine du projet avec la variable suivante :

env
Copier
Modifier
VITE_API_URL=http://localhost:3000/api

Lancement
Pour démarrer l’application en mode développement :

bash
Copier
Modifier
npm run dev
Vite lance un serveur local (par défaut sur le port 5173) et recharge automatiquement l’application lors de chaque modification de code. La variable VITE_API_URL doit correspondre à l’URL de votre back‑end.

Construction pour la production
Pour générer une version optimisée de l’application prête à être servie sur un serveur statique :

bash
Copier
Modifier
npm run build
Cette commande crée un dossier dist contenant les fichiers HTML, CSS et JavaScript minifiés.

Scripts utiles
Commande	Description
npm run dev	Lance l’application en mode développement avec rechargement à chaud
npm run build	Compile l’application pour la production dans le dossier dist
npm run preview	Prévisualise localement la version de production

Déploiement
L’interface est conçue pour être déployée sur Vercel ou tout autre service capable de servir des fichiers statiques. Sur Vercel, il suffit d’importer le dépôt GitHub, de définir VITE_API_URL dans l’interface d’administration et de lancer la construction. Chaque commit fusionné sur la branche principale déclenche un nouveau déploiement.

Contribution
Configuration de Vite et Tailwind
L’application est démarrée par Vite, qui offre un serveur de développement rapide et une compilation optimisée. Le fichier tailwind.config.js permet de personnaliser les couleurs, les tailles et les polices. Les styles globaux sont définis dans src/index.css. Pour ajouter Tailwind à un nouveau composant, il suffit d’utiliser les classes utilitaires (par exemple className="p-4 bg-gray-100").

Les fichiers d’entrée sont src/main.jsx et src/App.jsx. Les pages sont réparties dans src/pages (Dashboard, Entreprises, Profil, Authentification) et les services dans src/services. Pour ajouter une nouvelle dépendance, utilisez npm install <package> et importez‑la dans le composant concerné.

Structure des pages
L’interface est organisée autour des pages suivantes :

Dashboard (Dashboard.jsx) : page d’accueil avec présentation et vidéo.

Entreprises (Entreprises.jsx) : liste et carte des entreprises, filtres de recherche.

Profil (Profil.jsx) : informations personnelles, formulaire d’avis, téléchargement de CV.

Auth (LoginRegister.jsx) : formulaires d’inscription et de connexion.

Les routes sont définies dans App.jsx et utilisent react-router-dom pour gérer la navigation et la protection des pages.

Feuille de route
Les prochaines fonctionnalités envisagées pour l’interface sont les suivantes :

Ajout d’un système de messagerie entre étudiants et entreprises.

Mise en place de filtres avancés (secteur, diplôme, région).

Amélioration de l’accessibilité (navigation clavier, mode sombre, contraste élevé).

Liens et documentation
La documentation complète de l’API est accessible via le dépôt back‑end (route /api/docs). Pour comprendre la structure de l’interface et contribuer, consultez les fichiers src/pages, src/components et src/services.
