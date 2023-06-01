// Add "active" class when menu item matches current page.
document.querySelectorAll('.menu-item').forEach((aciveItem) => {
  if (aciveItem.href === window.location.href) {
    aciveItem.classList.add('active');
    aciveItem.setAttribute('aria-current', 'page');
  }
});


// Script to dynamically get the current year.
const date = new Date();
let currentYear = date.getFullYear();
document.getElementById('current-year').innerHTML = currentYear;
