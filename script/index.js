// document.addEventListener('DOMContentLoaded', function() {
//   const toggleButtons = document.querySelectorAll('.toggle-btn');

//   toggleButtons.forEach(button => {
//       const arrowDown = button.querySelector('.arrow-down');
//       const arrowUp = button.querySelector('.arrow-up');
//       const dropdownContent = button.nextElementSibling;

//       // État initial
//       arrowUp.style.display = 'none';
//       dropdownContent.style.display = 'none';

//       button.addEventListener('click', function() {
//           // Fermer tous les autres dropdowns
//           toggleButtons.forEach(otherButton => {
//               if (otherButton !== button) {
//                   const otherArrowDown = otherButton.querySelector('.arrow-down');
//                   const otherArrowUp = otherButton.querySelector('.arrow-up');
//                   const otherDropdownContent = otherButton.nextElementSibling;
                  
//                   otherArrowDown.style.display = 'inline-block';
//                   otherArrowUp.style.display = 'none';
//                   otherDropdownContent.style.display = 'none';
//               }
//           });

//           // Basculer la visibilité des flèches et du contenu pour le bouton cliqué
//           const isHidden = dropdownContent.style.display === 'none';
          
//           arrowDown.style.display = isHidden ? 'none' : 'inline-block';
//           arrowUp.style.display = isHidden ? 'inline-block' : 'none';
//           dropdownContent.style.display = isHidden ? 'block' : 'none';
//       });
//   });
// });

document.addEventListener('DOMContentLoaded', function() {
  const dropdowns = document.querySelectorAll('.dropdown');

  dropdowns.forEach(dropdown => {
    const button = dropdown.querySelector('.btn');
    const menu = dropdown.querySelector('.dropdown-menu');
    const arrowDown = button.querySelector('.arrow-down');
    const arrowUp = button.querySelector('.arrow-up');

    button.addEventListener('click', function(event) {
      event.stopPropagation();

      // Basculer l'état du dropdown actuel
      toggleDropdown(dropdown);
    });
  });

  // Fermer les dropdowns lorsqu'on clique en dehors
  document.addEventListener('click', function(event) {
    if (!event.target.closest('.dropdown')) {
      dropdowns.forEach(dropdown => {
        closeDropdown(dropdown);
      });
    }
  });

  function toggleDropdown(dropdown) {
    const isOpen = dropdown.classList.contains('show');
    const button = dropdown.querySelector('.btn');
    const menu = dropdown.querySelector('.dropdown-menu');
    const arrowDown = button.querySelector('.arrow-down');
    const arrowUp = button.querySelector('.arrow-up');

    if (isOpen) {
      closeDropdown(dropdown);
    } else {
      dropdown.classList.add('show');
      menu.style.display = 'block';
      arrowDown.style.display = 'none';
      arrowUp.style.display = 'inline-block';
    }
  }

  function closeDropdown(dropdown) {
    const button = dropdown.querySelector('.btn');
    const menu = dropdown.querySelector('.dropdown-menu');
    const arrowDown = button.querySelector('.arrow-down');
    const arrowUp = button.querySelector('.arrow-up');

    dropdown.classList.remove('show');
    menu.style.display = 'none';
    arrowDown.style.display = 'inline-block';
    arrowUp.style.display = 'none';
  }
});