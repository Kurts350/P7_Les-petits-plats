/**
 * Crée un nouveau filtre
 * @returns {Object} Un objet contenant les filtres initiaux
 */
const createFilters = () => ({
  ingredients: new Set(),
  appareils: new Set(),
  ustensiles: new Set()
});

/**
 * Met à jour un ensemble de filtres
 * @param {Object} filters - L'état actuel des filtres
 * @param {string} type - Le type de filtre à mettre à jour
 * @param {string} value - La valeur à ajouter
 * @param {boolean} shouldAdd - True pour ajouter, False pour supprimer
 * @returns {Object} Nouveau état des filtres
 */
const updateFilters = (filters, type, value, shouldAdd) => {
  const newFilters = {
    ingredients: new Set(filters.ingredients),
    appareils: new Set(filters.appareils),
    ustensiles: new Set(filters.ustensiles)
  };

  if (shouldAdd) {
    newFilters[type].add(value);
  } else {
    newFilters[type].delete(value);
  }

  return newFilters;
};

/**
 * Extrait les options disponibles pour chaque type de filtre à partir des recettes filtrées
 * @param {Array} recipes - Les recettes filtrées
 * @returns {Object} Options disponibles pour chaque type de filtre
 */
const getAvailableOptions = (recipes) => {
  return recipes.reduce((acc, recipe) => {
    // Collecte des ingrédients
    recipe.ingredients.forEach(ing => {
      acc.ingredients.add(ing.ingredient.toLowerCase());
    });
    
    // Collecte des appareils
    acc.appareils.add(recipe.appliance.toLowerCase());
    
    // Collecte des ustensiles
    recipe.ustensils.forEach(ust => {
      acc.ustensiles.add(ust.toLowerCase());
    });
    
    return acc;
  }, {
    ingredients: new Set(),
    appareils: new Set(),
    ustensiles: new Set()
  });
};

/**
 * Vérifie si une recette correspond aux critères de filtrage
 * @param {Object} filters - Les filtres actifs
 * @param {Object} recipe - La recette à vérifier
 * @returns {boolean} True si la recette correspond aux critères
 */
const matchesFilters = (filters, recipe) => {
  const matchesIngredients = filters.ingredients.size === 0 ||
    [...filters.ingredients].every(ing => 
      recipe.ingredients.some(i => 
        i.ingredient.toLowerCase() === ing.toLowerCase()
      )
    );

  const matchesAppliances = filters.appareils.size === 0 ||
    [...filters.appareils].some(app => 
      recipe.appliance.toLowerCase() === app.toLowerCase()
    );

  const matchesUstensils = filters.ustensiles.size === 0 ||
    [...filters.ustensiles].every(ust => 
      recipe.ustensils.some(u => 
        u.toLowerCase() === ust.toLowerCase()
      )
    );

  return matchesIngredients && matchesAppliances && matchesUstensils;
};

/**
 * Filtre les recettes selon les critères
 * @param {Array} recipes - Toutes les recettes
 * @param {Object} filters - Les filtres actifs
 * @returns {Array} Les recettes filtrées
 */
const filterRecipes = (recipes, filters) =>
  recipes.filter(recipe => matchesFilters(filters, recipe));

export { createFilters, updateFilters, filterRecipes, matchesFilters, getAvailableOptions };