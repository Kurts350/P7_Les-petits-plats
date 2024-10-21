// Attendre que le DOM soit complètement chargé avant d'exécuter le script
document.addEventListener('DOMContentLoaded', function() {
  // Sélectionner tous les éléments avec la classe 'dropdown'
  const dropdowns = document.querySelectorAll('.dropdown');

  // Parcourir tous les dropdowns
  dropdowns.forEach(dropdown => {
    // Trouver le bouton à l'intérieur de chaque dropdown
    const button = dropdown.querySelector('.btn');

    // Ajouter un écouteur d'événement 'click' à chaque bouton
    button.addEventListener('click', function(event) {
      // Empêcher la propagation de l'événement pour éviter de déclencher l'événement de fermeture global
      event.stopPropagation();
      // Basculer l'état du dropdown (ouvert/fermé)
      toggleDropdown(dropdown);
    });
  });

  // Ajouter un écouteur d'événement 'click' au document entier
  document.addEventListener('click', function(event) {
    // Vérifier si le clic n'est pas à l'intérieur d'un dropdown
    if (!event.target.closest('.dropdown')) {
      // Si le clic est en dehors, fermer tous les dropdowns
      closeAllDropdowns();
    }
  });

  // Fonction pour basculer l'état d'un dropdown
  function toggleDropdown(dropdown) {
    // Vérifier si le dropdown est actuellement ouvert
    const isOpen = dropdown.classList.contains('show');

    if (isOpen) {
      // Si ouvert, le fermer
      closeDropdown(dropdown);
    } else {
      // Si fermé, l'ouvrir
      openDropdown(dropdown);
    }
  }

  // Fonction pour ouvrir un dropdown
  function openDropdown(dropdown) {
    // Sélectionner les éléments nécessaires
    const button = dropdown.querySelector('.btn');
    const menu = dropdown.querySelector('.dropdown-menu');
    const arrowDown = button.querySelector('.fa-chevron-down');
    const arrowUp = button.querySelector('.fa-chevron-up');

    // Ajouter la classe 'show' pour indiquer que le dropdown est ouvert
    dropdown.classList.add('show');
    // Afficher le menu
    menu.style.display = 'block';
    // Gérer l'affichage des icônes de flèche
    if (arrowDown) arrowDown.style.display = 'none';
    if (arrowUp) arrowUp.style.display = 'inline-block';
  }

  // Fonction pour fermer un dropdown
  function closeDropdown(dropdown) {
    // Sélectionner les éléments nécessaires
    const button = dropdown.querySelector('.btn');
    const menu = dropdown.querySelector('.dropdown-menu');
    const arrowDown = button.querySelector('.fa-chevron-down');
    const arrowUp = button.querySelector('.fa-chevron-up');

    // Retirer la classe 'show' pour indiquer que le dropdown est fermé
    dropdown.classList.remove('show');
    // Cacher le menu
    menu.style.display = 'none';
    // Gérer l'affichage des icônes de flèche
    if (arrowDown) arrowDown.style.display = 'inline-block';
    if (arrowUp) arrowUp.style.display = 'none';
  }

  // Fonction pour fermer tous les dropdowns
  function closeAllDropdowns() {
    // Parcourir tous les dropdowns et les fermer
    dropdowns.forEach(dropdown => {
      closeDropdown(dropdown);
    });
  }
});