const openMenu = document.querySelector('#hamburgerMenu');
const body = document.body;
const templateMenu = document.querySelector('#innerMenu');

openMenu.addEventListener('click', e => {
  e.preventDefault;
  const menu = document.createElement('nav');
  menu.classList.add('menu', 'menu--inner');
  body.appendChild(menu);
  menu.innerHTML = templateMenu.innerHTML;
  
  const closeMenu = document.querySelector('#closeMenu')
  closeMenu.addEventListener('click', e => {
    e.preventDefault;
    body.removeChild(menu);
  })

})


