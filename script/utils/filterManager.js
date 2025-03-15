/**
 * Gestion des filtres pour les recettes
 */

// Création des filtres initiaux
const createFilters = () => ({
  ingredients: new Set(),
  appareils: new Set(),
  ustensiles: new Set()
});

// Mise à jour des filtres
const updateFilters = (filters, type, value, shouldAdd) => {
  const newFilters = {
    ingredients: new Set(filters.ingredients),
    appareils: new Set(filters.appareils),
    ustensiles: new Set(filters.ustensiles)
  };

  shouldAdd ? newFilters[type].add(value) : newFilters[type].delete(value);
  return newFilters;
};

// Extraction des options disponibles
const getAvailableOptions = (recipes) => {
  const options = {
    ingredients: new Set(),
    appareils: new Set(),
    ustensiles: new Set()
  };

  recipes.forEach(recipe => {
    recipe.ingredients.forEach(ing => options.ingredients.add(ing.ingredient.toLowerCase()));
    options.appareils.add(recipe.appliance.toLowerCase());
    recipe.ustensils.forEach(ust => options.ustensiles.add(ust.toLowerCase()));
  });

  return options;
};

// Vérification des filtres
const matchesFilters = (filters, recipe) => {
  const hasMatchingIngredients = filters.ingredients.size === 0 ||
    [...filters.ingredients].every(ing => 
      recipe.ingredients.some(i => i.ingredient.toLowerCase() === ing.toLowerCase())
    );

  const hasMatchingAppliance = filters.appareils.size === 0 ||
    [...filters.appareils].some(app => recipe.appliance.toLowerCase() === app.toLowerCase());

  const hasMatchingUstensils = filters.ustensiles.size === 0 ||
    [...filters.ustensiles].every(ust => 
      recipe.ustensils.some(u => u.toLowerCase() === ust.toLowerCase())
    );

  return hasMatchingIngredients && hasMatchingAppliance && hasMatchingUstensils;
};

const filterRecipes = (recipes, filters) =>
  recipes.filter(recipe => matchesFilters(filters, recipe));

export { createFilters, updateFilters, filterRecipes, matchesFilters, getAvailableOptions };