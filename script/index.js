import { createRecipeCard } from './components/template.js';
import { toggleDropdownDisplay, updateDropdownContent } from './components/dropdown.js';
import { createFilters, updateFilters, filterRecipes, matchesFilters } from './utils/filterManager.js';
import { searchRecipes, initializeSearch } from './utils/searchManager.js';
/**
 * Met à jour le compteur de recettes
 * @param {number} count - Nombre de recettes à afficher
 */
const updateRecipeCount = count => {
  const recipeCountElement = document.querySelector(".recipe-count");
  if (recipeCountElement) {
    recipeCountElement.textContent = `${count} recettes`;
  }
};

/**
 * Met à jour l'affichage des recettes
 * @param {Array} recipes - Les recettes à afficher
 * @param {HTMLElement} container - Le conteneur
 */
const updateDisplay = (recipes, container) => {
  container.innerHTML = "";
  recipes
    .map(createRecipeCard)
    .forEach(card => container.appendChild(card));
  
  updateRecipeCount(recipes.length);
};

/**
 * Point d'entrée principal
 */
const initialize = () => {
  const recipesContainer = document.getElementById("recipes-container");
  if (!recipesContainer) {
    console.error("L'élément 'recipes-container' n'a pas été trouvé dans le DOM.");
    return;
  }

  // Récupération des éléments dropdown
  const dropdownElements = {
    ingredients: document.querySelector('[data-target="ingredients"]')?.closest('.dropdown'),
    appareils: document.querySelector('[data-target="appareils"]')?.closest('.dropdown'),
    ustensiles: document.querySelector('[data-target="ustensiles"]')?.closest('.dropdown')
  };

  let currentFilters = createFilters();
  let currentSearchTerm = '';
  
  // Gestionnaire unifié pour la recherche et les filtres
  const handleSearchAndFilter = () => {
    const filteredRecipes = searchRecipes(recipes, currentSearchTerm, currentFilters, matchesFilters);
    updateDisplay(filteredRecipes, recipesContainer);
    
    // Mise à jour des dropdowns avec les options disponibles
    Object.entries(dropdownElements).forEach(([type, dropdown]) => {
      if (dropdown) {
        updateDropdownContent(dropdown, filteredRecipes, type, handleFilterChange, currentFilters);
      }
    });
  };

  // Gestionnaire de recherche
  const handleSearch = (searchTerm) => {
    currentSearchTerm = searchTerm;
    handleSearchAndFilter();
  };

  // Gestionnaire de changement de filtres
  const handleFilterChange = (newFilters) => {
    currentFilters = newFilters;
    handleSearchAndFilter();
  };

  // Initialisation de la recherche avec l'input du header
  initializeSearch(handleSearch);

  // Configuration initiale des dropdowns
  if (Array.isArray(recipes)) {
    // Remplissage initial des dropdowns
    Object.entries(dropdownElements).forEach(([type, dropdown]) => {
      if (dropdown) {
        updateDropdownContent(dropdown, recipes, type, handleFilterChange, currentFilters);
      }
    });

    // Affichage initial des recettes
    updateDisplay(recipes, recipesContainer);
  } else {
    console.error("La variable recipes n'est pas définie ou n'est pas un tableau");
    return;
  }

  // Gestion des événements des dropdowns
  document.querySelectorAll('.dropdown').forEach(dropdown => {
    const button = dropdown.querySelector('.btn');
    if (button) {
      button.addEventListener('click', event => {
        event.stopPropagation();
        const isOpen = dropdown.classList.contains('show');
        toggleDropdownDisplay(dropdown, !isOpen);
      });
    }
  });
};

// Démarrage de l'application
document.addEventListener('DOMContentLoaded', initialize);

export { updateRecipeCount, updateDisplay };