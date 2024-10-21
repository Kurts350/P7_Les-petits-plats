// Attendre que le DOM soit entièrement chargé avant d'exécuter le script
document.addEventListener('DOMContentLoaded', () => {
  // Sélectionner le conteneur des recettes
  const recipesContainer = document.getElementById('recipes-container');

  // Vérifier que l'élément nécessaire existe dans le DOM
  if (!recipesContainer) {
      console.error("L'élément 'recipes-container' n'a pas été trouvé dans le DOM.");
      return;
  }

  // Définir le template de la carte de recette en utilisant un template literal
  const recipeCardTemplate = `
    <div class="col">
      <div class="card h-100">
        <p class="time"></p>
        <img class="card-img-top recipe-image" alt="Image de la recette">
        <div class="card-body p-4">
          <h5 class="card-title recipe-name mb-4"></h5>
          <h6 class="card-subtitle mb-2 text-muted small text-uppercase">Recette</h6>
          <p class="card-text recipe-description mb-4"></p>
          <h6 class="card-subtitle mb-3 text-muted small text-uppercase">Ingrédients</h6>
          <div class="row recipe-ingredients g-3">
            <!-- Les ingrédients seront insérés ici -->
          </div>
        </div>
      </div>
    </div>
  `;

  // Fonction pour créer une carte de recette à partir des données d'une recette
  const createRecipeCard = (recipe) => {
      // Créer un élément temporaire pour contenir le template
      const tempElement = document.createElement('div');
      tempElement.innerHTML = recipeCardTemplate;
      const cardElement = tempElement.firstElementChild;
      
      // Remplir les détails de la recette
      cardElement.querySelector('.recipe-image').src = `assets/recette/${recipe.image}`;
      cardElement.querySelector('.time').textContent = `${recipe.time} min`;
      cardElement.querySelector('.recipe-image').alt = recipe.name;
      cardElement.querySelector('.recipe-name').textContent = recipe.name ;
      cardElement.querySelector('.recipe-description').textContent = truncateText(recipe.description, 200);

      // Créer la liste des ingrédients sur deux colonnes
      const ingredientsContainer = cardElement.querySelector('.recipe-ingredients');
      recipe.ingredients.forEach(ing => {
          const ingredientCol = document.createElement('div');
          ingredientCol.className = 'col-6';
          
          const ingredientContent = document.createElement('div');
          ingredientContent.className = 'd-flex flex-column';

          const ingredientName = document.createElement('span');
          ingredientName.className = 'fw-bold small';
          ingredientName.textContent = ing.ingredient;

          const ingredientQuantity = document.createElement('span');
          ingredientQuantity.className = 'text-muted smaller';
          let quantityText = ing.quantity ? `${ing.quantity}` : '';
          if (ing.unit) quantityText += ` ${ing.unit}`;
          ingredientQuantity.textContent = quantityText;

          ingredientContent.appendChild(ingredientName);
          ingredientContent.appendChild(ingredientQuantity);
          ingredientCol.appendChild(ingredientContent);
          ingredientsContainer.appendChild(ingredientCol);
      });

      return cardElement;
  };

  // Fonction pour afficher toutes les recettes
  const displayRecipes = (recipes) => {
      // Vérifier si recipes est bien un tableau
      if (!Array.isArray(recipes)) {
          console.error('La variable recipes n\'est pas un tableau.');
          return;
      }

      // Créer et ajouter une carte pour chaque recette
      recipes.forEach(recipe => {
          const recipeCard = createRecipeCard(recipe);
          recipesContainer.appendChild(recipeCard);
      });
  };

  // Vérifier si la variable recipes est définie et est un tableau
  if (typeof recipes !== 'undefined' && Array.isArray(recipes)) {
      displayRecipes(recipes);
  } else {
      console.error('La variable recipes n\'est pas définie ou n\'est pas un tableau');
  }
});

// Fonction pour tronquer le texte
function truncateText(text, maxLength) {
  if (text.length > maxLength) {
      return text.slice(0, maxLength) + '...';
  }
  return text;
}