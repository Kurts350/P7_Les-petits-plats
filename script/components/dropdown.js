// Importation de la fonction de mise à jour des filtres
import { updateFilters } from '../utils/filterManager.js';

// Gère l'affichage/masquage du dropdown
const toggleDropdownDisplay = (dropdown, shouldShow) => {
  if (!dropdown) return;
  
  // Ajoute/supprime la classe show et gère l'affichage du menu
  dropdown.classList[shouldShow ? 'add' : 'remove']('show');
  const menu = dropdown.querySelector('.dropdown-menu');
  if (menu) menu.style.display = shouldShow ? 'block' : 'none';

  // Réinitialise le champ de recherche à la fermeture
  if (!shouldShow) {
    const searchInput = dropdown.querySelector('.form-control');
    if (searchInput) searchInput.value = '';
  }
};

// Fonction principale de mise à jour du contenu du dropdown
const updateDropdownContent = (dropdown, recipes, type, onSelectionChange, currentFilters) => {
  const mainList = dropdown.querySelector(`[data-list="${type}MainList"]`);
  const tagsContainer = document.querySelector('.selected-tags-container');
  
  if (!mainList || !tagsContainer) return;

  // Stocke les références des items pour pouvoir les mettre à jour
  const itemRefs = new Map();

  // Collecte tous les items uniques selon le type (ingrédients, appareils, ustensiles)
  const items = new Set();
  recipes.forEach(recipe => {
    if (type === 'ingredients') {
      recipe.ingredients.forEach(ing => items.add(ing.ingredient.toLowerCase()));
    } else if (type === 'appareils') {
      items.add(recipe.appliance.toLowerCase());
    } else if (type === 'ustensiles') {
      recipe.ustensils.forEach(ust => items.add(ust.toLowerCase()));
    }
  });

  // Crée un élément de liste avec gestion de la sélection/désélection
  const createListItem = (item, isSelected, onSelect, onDeselect) => {
    const li = document.createElement('li');
    li.setAttribute('data-item', item);
    li.className = 'dropdown-item';
    
    // Fonction de mise à jour de l'affichage de l'item
    const updateView = (selected) => {
      li.innerHTML = `
        <div class="d-flex justify-content-between align-items-center w-100 px-3 py-2">
          <span>${item}</span>
          ${selected ? '<i class="fa-solid fa-circle-xmark"></i>' : ''}
        </div>
      `;
    };

    updateView(isSelected);

    // Gestion des clics sur l'item
    li.addEventListener('click', (e) => {
      e.stopPropagation();
      e.preventDefault();
      
      if (e.target.classList.contains('fa-circle-xmark')) {
        onDeselect();
        updateView(false);
      } else if (!isSelected) {
        onSelect();
        updateView(true);
      }
    });

    return { element: li, updateView };
  };

  // Gère la sélection d'un item
  const handleSelect = (item) => {
    // Met à jour les filtres
    const newFilters = updateFilters(currentFilters, type, item, true);
    onSelectionChange(newFilters);

    // Crée et ajoute le tag correspondant
    const tag = document.createElement('button');
    tag.className = 'btn-warning border-0 d-inline-flex align-items-center justify-content-between p-2 p-sm-3 mx-1 my-1 fw-medium selected-tag flex-grow-0 flex-shrink-1 mw-100';
    tag.setAttribute('data-tag', item);
    tag.innerHTML = `
      <span class="me-2 small text-white text-truncate">${item}</span>
      <i class="fa-solid fa-xmark text-white fs-6"></i>
    `;
    
    // Gestion du clic sur la croix du tag
    tag.querySelector('.fa-xmark').addEventListener('click', () => {
      tag.remove();
      handleDeselect(item);
    });
    
    tagsContainer.appendChild(tag);
    toggleDropdownDisplay(dropdown, false);
  };

  // Gère la désélection d'un item
  const handleDeselect = (item) => {
    // Met à jour les filtres
    const newFilters = updateFilters(currentFilters, type, item, false);
    onSelectionChange(newFilters);

    // Supprime le tag correspondant
    const tag = tagsContainer.querySelector(`[data-tag="${item}"]`);
    if (tag) tag.remove();

    // Met à jour l'affichage de l'item dans la liste
    const listItem = itemRefs.get(item);
    if (listItem) {
      listItem.updateView(false);
    }
  };

  // Initialise la liste avec tous les items
  mainList.innerHTML = '';
  Array.from(items).forEach(item => {
    const isSelected = currentFilters[type].has(item);
    const listItem = createListItem(
      item,
      isSelected,
      () => handleSelect(item),
      () => handleDeselect(item)
    );
    itemRefs.set(item, listItem);
    mainList.appendChild(listItem.element);
  });

  // Configure le système de recherche
  const searchInput = dropdown.querySelector('.form-control');
  if (searchInput && !searchInput._hasHandler) {
    searchInput._hasHandler = true;
    searchInput.addEventListener('input', (e) => {
      const searchTerm = e.target.value.toLowerCase().trim();
      itemRefs.forEach((listItem, item) => {
        if (listItem.element) {
          // Affiche/masque les items selon le terme de recherche
          listItem.element.style.display = 
            item.toLowerCase().includes(searchTerm) ? '' : 'none';
        }
      });
    });
  }
};

export {
  toggleDropdownDisplay,
  updateDropdownContent
};