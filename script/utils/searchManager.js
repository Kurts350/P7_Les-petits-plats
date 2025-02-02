/**
 * Filtre les recettes selon la recherche et les filtres
 */
const searchRecipes = (recipes, searchTerm, activeFilters, matchesFilters) => {
  const filteredRecipes = recipes.filter(recipe => 
    (!searchTerm || searchTerm.length < 3 || recipe.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    recipe.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    recipe.ingredients.some(ing => ing.ingredient.toLowerCase().includes(searchTerm.toLowerCase()))) 
    && matchesFilters(activeFilters, recipe)
  );

  // Message si aucun résultat
  const container = document.getElementById('recipes-container');
  const shouldShowMessage = searchTerm?.length >= 3 && !filteredRecipes.length;
  
  container.style.display = shouldShowMessage ? 'none' : '';
  document.querySelector('.no-recipe-message')?.remove();
  
  if (shouldShowMessage) {
    container.insertAdjacentHTML('afterend', `
      <div class="no-recipe-message text-center my-5">
        <p class="fs-4 fw-light">Aucune recette ne contient '${searchTerm}'<br>
        Vous pouvez chercher « tarte aux pommes », « poisson », etc.</p>
      </div>`
    );
  }

  return filteredRecipes;
};

/**
 * Initialise la barre de recherche
 */
const initializeSearch = (handleSearch) => {
  const form = document.querySelector('.header__background--searchbar');
  const input = document.querySelector('input[name="searchbar"]');
  if (!input) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
  });

  let debounceTimer;
  input.addEventListener('input', ({target}) => {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      if (!target.value || target.value.length >= 3) {
        handleSearch(target.value);
      }
    }, 300);
  });
};

export { searchRecipes, initializeSearch };