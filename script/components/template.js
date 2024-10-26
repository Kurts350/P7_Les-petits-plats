// Fonction pour tronquer le texte
function truncateText(text, maxLength) {
  if (text.length > maxLength) {
    return text.slice(0, maxLength) + "...";
  }
  return text;
}

// Fonction pour créer une carte de recette à partir des données d'une recette
const createRecipeCard = (recipe) => {
  const recipeCardTemplate = `
    <div class="col">
      <div class="card h-100">
        <p class="time">${recipe.time} min</p>
        <img class="card-img-top recipe-image" src="assets/recette/${recipe.image}" alt="${recipe.name}">
        <div class="card-body p-4">
          <h5 class="card-title recipe-name mb-4">${recipe.name}</h5>
          <h6 class="card-subtitle mb-2 text-muted small text-uppercase">Recette</h6>
          <p class="card-text recipe-description mb-4">${truncateText(recipe.description, 200)}</p>
          <h6 class="card-subtitle mb-3 text-muted small text-uppercase">Ingrédients</h6>
          <div class="row recipe-ingredients g-3">
            ${recipe.ingredients.map(ing => `
              <div class="col-6 ingredient-item">
                <div class="d-flex flex-column">
                  <span class="fw-bold small ingredient-name">${ing.ingredient}</span>
                  <span class="text-muted smaller ingredient-quantity">${ing.quantity ? ing.quantity : ''} ${ing.unit || ''}</span>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    </div>
  `;

  const tempElement = document.createElement("div");
  tempElement.innerHTML = recipeCardTemplate;
  return tempElement.firstElementChild;
};

export { createRecipeCard };