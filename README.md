# Projet 7 – Les Petits Plats

Ce projet est le septième du parcours **Développeur d'application JavaScript React** chez OpenClassrooms. Il consiste à développer un moteur de recherche performant pour un site de recettes de cuisine, en mettant l'accent sur l'optimisation des performances et la qualité du code.

---

## 🎯 Objectif

- Développer un moteur de recherche performant pour le site **Les Petits Plats**, permettant aux utilisateurs de trouver rapidement des recettes en fonction de différents critères.
- Implémenter deux algorithmes de recherche distincts : l'un utilisant une boucle native (`for`, `while`), l'autre utilisant une boucle fonctionnelle (`forEach`, `map`).
- Comparer les performances de ces deux algorithmes à l'aide de l'outil [JSBench](https://jsbench.me/).
- Rédiger une fiche d'investigation pour analyser les performances et justifier le choix de l'algorithme retenu.

---

## 🛠️ Technologies utilisées

- HTML5
- CSS3 (avec ou sans framework)
- JavaScript (ES6)
- Outils : JSBench, W3C Validator, Lighthouse

---

## 📁 Structure du projet

```
les-petits-plats/
├── index.html
├── css/
│   └── style.css
├── js/
│   ├── search.js
│   └── data.json
└── README.md
```

---

## ▶️ Lancer le projet

1. Cloner le dépôt :
   ```bash
   git clone https://github.com/Kurts350/P7_Les-petits-plats.git
   cd les-petits-plats
   ```

2. Ouvrir le fichier `index.html` dans votre navigateur.

3. Tester le moteur de recherche en saisissant des mots-clés dans la barre de recherche.

---

## 🔍 Fonctionnalités

- Recherche instantanée des recettes en fonction du nom, des ingrédients, des ustensiles et des appareils.
- Filtrage des résultats en temps réel lors de la saisie.
- Affichage des résultats pertinents en fonction des critères sélectionnés.

---

## 📊 Comparaison des algorithmes

| Critère             | Boucle native (`for`, `while`) | Boucle fonctionnelle (`forEach`, `map`) |
|---------------------|-------------------------------|----------------------------------------|
| Performance         | ✅ Plus rapide                 | ⚠️ Moins rapide                        |
| Lisibilité du code  | ⚠️ Moins lisible               | ✅ Plus lisible                         |
| Compatibilité       | ✅ Compatible avec tous les navigateurs | ⚠️ Moins compatible avec certains navigateurs |

*Note : Les performances peuvent varier en fonction de la taille des données et du navigateur utilisé.*

---

## ✅ Checklist de validation

- [x] Implémentation du moteur de recherche fonctionnel
- [x] Comparaison des performances des deux algorithmes
- [x] Rédaction de la fiche d'investigation
- [x] Validation du code HTML et CSS via les outils W3C Validator
- [x] Audit de performance et d'accessibilité via Lighthouse

---

## 📄 Licence

Ce projet a été réalisé à des fins pédagogiques dans le cadre de la formation OpenClassrooms – Développeur d'application JavaScript React.

---

## 👤 Auteur

**NIAKATE Biaguy**  
Formation Développeur d'application JavaScript React – OpenClassrooms  
📅 Octobre 2024
