import { updateFilters } from '../utils/filterManager.js';

// Gestion de l'affichage du dropdown
const toggleDropdownDisplay = (dropdown, shouldShow) => {
  if (!dropdown) return;
  
  dropdown.classList[shouldShow ? 'add' : 'remove']('show');
  const menu = dropdown.querySelector('.dropdown-menu');
  if (menu) {
    menu.style.display = shouldShow ? 'block' : 'none';
    menu.style.maxHeight = '320px';
    menu.style.overflowY = 'scroll';
    menu.style.width = '100%';
  }

  // Réinitialisation à la fermeture
  if (!shouldShow) {
    const search = dropdown.querySelector('.form-control');
    if (search) {
      search.value = '';
      dropdown.querySelectorAll('.dropdown-item').forEach(item => item.style.display = '');
    }
  }
};

// Mise à jour du contenu
const updateDropdownContent = (dropdown, recipes, type, onSelectionChange, currentFilters) => {
  const mainList = dropdown.querySelector(`[data-list="${type}MainList"]`);
  const tagsContainer = document.querySelector('.selected-tags-container');
  if (!mainList || !tagsContainer) return;

  // Collecte des items uniques avec préservation de la casse originale
  const items = new Set();
  recipes.forEach(recipe => {
    if (type === 'ingredients') {
      recipe.ingredients.forEach(ing => items.add(ing.ingredient));
    } else if (type === 'appareils') {
      items.add(recipe.appliance);
    } else if (type === 'ustensiles') {
      recipe.ustensils.forEach(ust => items.add(ust));
    }
  });


  // Fonction de mise à jour de l'apparence d'un item
  const updateItemAppearance = (li, item, isSelected) => {
    li.innerHTML = `
      <div class="d-flex justify-content-between align-items-center w-100 px-3 py-2">
        <span class="text-truncate">${item}</span>
        ${isSelected ? '<i class="fa-solid fa-circle-xmark ms-2"></i>' : ''}
      </div>
    `;
  };

  // Fonction de désélection globale qui met à jour tous les éléments concernés
  const globalHandleDeselection = (itemToDeselect) => {
    const newFilters = updateFilters(currentFilters, type, itemToDeselect.toLowerCase(), false);
    
    // Mise à jour du tag
    const tag = tagsContainer.querySelector(`[data-tag="${itemToDeselect.toLowerCase()}"]`);
    if (tag) tag.remove();
    
    // Mise à jour de l'item dans le dropdown
    const dropdownItem = mainList.querySelector(`[data-search-term="${itemToDeselect.toLowerCase()}"]`);
    if (dropdownItem) {
      updateItemAppearance(dropdownItem, itemToDeselect, false);
    }
    
    onSelectionChange(newFilters);
  };

  // Création des éléments de liste
  mainList.innerHTML = '';
  Array.from(items).forEach(item => {
    const isSelected = currentFilters[type].has(item.toLowerCase());
    const li = document.createElement('li');
    li.className = 'dropdown-item';
    li.setAttribute('data-search-term', item.toLowerCase());
    li.setAttribute('data-filter-type', type);
    
    updateItemAppearance(li, item, isSelected);

    const handleSelection = () => {
      if (!isSelected) {
        const newFilters = updateFilters(currentFilters, type, item.toLowerCase(), true);
        const tag = document.createElement('button');
        tag.className = 'btn-warning border-0 d-inline-flex align-items-center p-2 mx-1 my-1 fw-medium selected-tag';
        tag.setAttribute('data-tag', item.toLowerCase());
        tag.setAttribute('data-filter-type', type);
        tag.innerHTML = `<span class="me-2 text-white">${item}</span><i class="fa-solid fa-xmark text-white"></i>`;
        
        // Utilisation de la fonction globale de désélection
        tag.querySelector('.fa-xmark').addEventListener('click', (e) => {
          e.stopPropagation();
          globalHandleDeselection(item);
        });
        
        tagsContainer.appendChild(tag);
        updateItemAppearance(li, item, true);
        onSelectionChange(newFilters);
        toggleDropdownDisplay(dropdown, false);
      }
    };

    li.addEventListener('click', (e) => {
      e.stopPropagation();
      if (e.target.closest('.fa-circle-xmark')) {
        globalHandleDeselection(item);
      } else if (!currentFilters[type].has(item.toLowerCase())) {
        handleSelection();
      }
    });

    mainList.appendChild(li);
  });

  // Synchronisation initiale des tags existants
  Array.from(tagsContainer.children).forEach(tag => {
    if (tag.getAttribute('data-filter-type') === type) {
      const itemValue = tag.getAttribute('data-tag');
      tag.querySelector('.fa-xmark')?.addEventListener('click', (e) => {
        e.stopPropagation();
        globalHandleDeselection(itemValue);
      });
    }
  });

  // Configuration de la recherche
  const searchInput = dropdown.querySelector('.form-control');
  if (searchInput && !searchInput._hasHandler) {
    searchInput._hasHandler = true;
    searchInput.addEventListener('input', (e) => {
      const searchTerm = e.target.value.toLowerCase();
      mainList.querySelectorAll('.dropdown-item').forEach(item => {
        item.style.display = item.getAttribute('data-search-term').includes(searchTerm) ? '' : 'none';
      });
    });
  }
};

export { toggleDropdownDisplay, updateDropdownContent };