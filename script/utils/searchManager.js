/**
 * Récupère les éléments uniques d'une propriété des recettes
 * @param {Array} recipes - Les recettes
 * @param {string} key - La propriété à extraire
 * @returns {Array} Liste unique d'éléments
 */
const getUniqueItems = (recipes, key) => {
  const items = [];
  const uniqueSet = new Set();

  for (let i = 0; i < recipes.length; i++) {
    const recipe = recipes[i];
    if (Array.isArray(recipe[key])) {
      for (let j = 0; j < recipe[key].length; j++) {
        const item = recipe[key][j];
        const value = typeof item === 'object' ? item.ingredient : item;
        uniqueSet.add(value);
      }
    } else {
      uniqueSet.add(recipe[key]);
    }
  }

  for (const item of uniqueSet) {
    items.push(item);
  }

  return items;
};

// Vérifie si une chaîne contient un terme de recherche
const containsSearchTerm = (str, searchTerm) => {
  const normalizedStr = str.toLowerCase();
  const normalizedTerm = searchTerm.toLowerCase();
  return normalizedStr.indexOf(normalizedTerm) !== -1;
};

// Vérifie si un ingrédient correspond au terme de recherche
const matchIngredient = (ingredient, searchTerm) => {
  return containsSearchTerm(ingredient.ingredient, searchTerm);
};

// Vérifie si une recette correspond aux critères de recherche
const matchesSearchCriteria = (recipe, searchTerm) => {
  if (!searchTerm || searchTerm.length < 3) return true;
  
  // Recherche dans le nom
  if (containsSearchTerm(recipe.name, searchTerm)) return true;
  
  // Recherche dans la description
  if (containsSearchTerm(recipe.description, searchTerm)) return true;
  
  // Recherche dans les ingrédients
  for (let i = 0; i < recipe.ingredients.length; i++) {
    if (matchIngredient(recipe.ingredients[i], searchTerm)) {
      return true;
    }
  }
  
  return false;
};

// Gère l'affichage du message "Aucune recette"
const toggleNoRecipeMessage = (searchTerm, hasResults) => {
  const existingMessage = document.querySelector('.no-recipe-message');
  if (existingMessage) {
    existingMessage.remove();
  }

  const recipesContainer = document.getElementById('recipes-container');
  if (!recipesContainer) return;

  if (hasResults || !searchTerm || searchTerm.length < 3) {
    recipesContainer.style.display = '';
    return;
  }

  recipesContainer.style.display = 'none';

  const messageElement = document.createElement('div');
  messageElement.className = 'no-recipe-message text-center my-5';
  messageElement.innerHTML = `
    <p class="fs-4 fw-light">
      Aucune recette ne contient '${searchTerm}' <br>
      Vous pouvez chercher « tarte aux pommes », « poisson », etc.
    </p>
  `;

  recipesContainer.insertAdjacentElement('afterend', messageElement);
};

/**
 * Filtre les recettes selon le terme de recherche et les filtres actifs
 * @param {Array} recipes - Toutes les recettes
 * @param {string} searchTerm - Terme de recherche
 * @param {Object} activeFilters - Filtres actifs
 * @param {Function} matchesFilters - Fonction de filtrage
 * @returns {Array} Recettes filtrées
 */
const searchRecipes = (recipes, searchTerm, activeFilters, matchesFilters) => {
  const filteredRecipes = [];
  
  for (let i = 0; i < recipes.length; i++) {
    const recipe = recipes[i];
    if (matchesSearchCriteria(recipe, searchTerm) && matchesFilters(activeFilters, recipe)) {
      filteredRecipes.push(recipe);
    }
  }
  
  toggleNoRecipeMessage(searchTerm, filteredRecipes.length > 0);
  
  return filteredRecipes;
};

// Utilitaire debounce pour limiter les appels de recherche
const debounce = (func, wait) => {
  let timeout;
  return function(...args) {
    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(function() {
      func.apply(this, args);
    }, wait);
  };
};

/**
 * Initialise la recherche sur la barre de recherche du header
 * @param {Function} handleSearch - Fonction de callback pour la recherche
 */
const initializeSearch = (handleSearch) => {
  const searchForm = document.querySelector('.header__background--searchbar');
  const searchInput = searchForm ? searchForm.querySelector('input[name="searchbar"]') : null;

  if (!searchForm || !searchInput) {
    console.error("Les éléments de recherche n'ont pas été trouvés");
    return;
  }

  const debouncedSearch = debounce(function(value) {
    if (!value || value.length >= 3) {
      handleSearch(value);
    }
  }, 300);

  searchInput.addEventListener('input', function(e) {
    debouncedSearch(e.target.value);
  });

  searchForm.addEventListener('submit', function(e) {
    e.preventDefault();
    handleSearch(searchInput.value);
  });
};

export { searchRecipes, initializeSearch, getUniqueItems };