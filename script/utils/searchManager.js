/**
 * Récupère les éléments uniques d'une propriété des recettes
 * @param {Array} recipes - Les recettes
 * @param {string} key - La propriété à extraire
 * @returns {Array} Liste unique d'éléments
 */
const getUniqueItems = (recipes, key) => 
  Array.from(new Set(
    recipes.flatMap(recipe => 
      Array.isArray(recipe[key])
        ? recipe[key].map(item => 
            typeof item === 'object' ? item.ingredient : item
          )
        : [recipe[key]]
    )
  ));

// Vérifie si une chaîne contient un terme de recherche
const containsSearchTerm = (str, searchTerm) =>
  str.toLowerCase().includes(searchTerm.toLowerCase());

// Vérifie si un ingrédient correspond au terme de recherche
const matchIngredient = (ingredient, searchTerm) =>
  containsSearchTerm(ingredient.ingredient, searchTerm);

// Vérifie si une recette correspond aux critères de recherche
const matchesSearchCriteria = (recipe, searchTerm) => {
  if (!searchTerm || searchTerm.length < 3) return true;
  
  return (
    // Recherche dans le nom
    containsSearchTerm(recipe.name, searchTerm) ||
    // Recherche dans la description
    containsSearchTerm(recipe.description, searchTerm) ||
    // Recherche dans les ingrédients
    recipe.ingredients.some(ingredient => matchIngredient(ingredient, searchTerm))
  );
};

// Gère l'affichage du message "Aucune recette"
const toggleNoRecipeMessage = (searchTerm, hasResults) => {
  // Supprime l'ancien message s'il existe
  const existingMessage = document.querySelector('.no-recipe-message');
  if (existingMessage) {
    existingMessage.remove();
  }

  // Récupère le conteneur de recettes
  const recipesContainer = document.getElementById('recipes-container');
  if (!recipesContainer) return;

  // Si on a des résultats ou pas de terme de recherche, on s'assure que le conteneur est visible
  if (hasResults || !searchTerm || searchTerm.length < 3) {
    recipesContainer.style.display = '';
    return;
  }

  // Cache le conteneur de recettes
  recipesContainer.style.display = 'none';

  // Crée et affiche le message
  const messageElement = document.createElement('div');
  messageElement.className = 'no-recipe-message text-center my-5';
  messageElement.innerHTML = `
    <p class="fs-4 fw-light">
      Aucune recette ne contient '${searchTerm}' <br>
      Vous pouvez chercher « tarte aux pommes », « poisson », etc.
    </p>
  `;

  // Insère le message après le conteneur de recettes
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
  const filteredRecipes = recipes
    .filter(recipe => matchesSearchCriteria(recipe, searchTerm))
    .filter(recipe => matchesFilters(activeFilters, recipe));
    
  // Affiche ou masque le message "Aucune recette"
  toggleNoRecipeMessage(searchTerm, filteredRecipes.length > 0);
  
  return filteredRecipes;
};

// Utilitaire debounce pour limiter les appels de recherche
const debounce = (func, wait) => {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

/**
 * Initialise la recherche sur la barre de recherche du header
 * @param {Function} handleSearch - Fonction de callback pour la recherche
 * @param {Function} updateUI - Fonction de mise à jour de l'interface
 */
const initializeSearch = (handleSearch) => {
  const searchForm = document.querySelector('.header__background--searchbar');
  const searchInput = searchForm?.querySelector('input[name="searchbar"]');

  if (!searchForm || !searchInput) {
    console.error("Les éléments de recherche n'ont pas été trouvés");
    return;
  }

  // Gestion du debounce sur l'input
  const debouncedSearch = debounce((value) => {
    if (!value || value.length >= 3) {
      handleSearch(value);
    }
  }, 300);

  // Écouteur d'événement sur l'input
  searchInput.addEventListener('input', (e) => {
    debouncedSearch(e.target.value);
  });

  // Empêcher la soumission du formulaire
  searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    handleSearch(searchInput.value);
  });
};

export { searchRecipes, initializeSearch, getUniqueItems };