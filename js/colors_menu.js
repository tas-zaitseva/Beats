const menu = document.querySelector('#horizontalMenu');
const items = document.querySelectorAll('.colors-menu__item');
const colorsButtons = document.querySelectorAll('.colors-menu__button');

function getItemInnerWidth(item) {
  let getResultWidth = 524; //379

  const windowWidth = window.innerWidth;
  const itemWidth = item.offsetWidth;

  const isTablet = window.matchMedia('(max-width: 768px)').matches; //true or false
  const isMobile = window.matchMedia('(max-width: 480px)').matches; //true or false

  if (isTablet) {
    getResultWidth = windowWidth - itemWidth * items.length;
  } 
  if (isMobile) {
    getResultWidth = windowWidth - itemWidth;
  }
  return getResultWidth;
}

function setWidth(targetElement) {
  let innerContent = targetElement.nextElementSibling;
  if (targetElement.classList.contains('active')) {
    targetElement.parentNode.classList.remove('colors-menu__item--active');
    targetElement.classList.remove('active');
    innerContent.style.width = 0;
    
  } else {
    items.forEach(item => {item.classList.remove('colors-menu__item--active')});
    targetElement.parentNode.classList.add('colors-menu__item--active');
    
    colorsButtons.forEach(button => {
      button.classList.remove('active');
      button.nextElementSibling.style.width = 0;
    });

    targetElement.classList.add('active');
    innerContent.firstElementChild.style.width = `${getItemInnerWidth(targetElement)}px`;
    innerContent.style.width = `${getItemInnerWidth(targetElement)}px`;
    
  }
}

menu.addEventListener('click', function(event) {
  event.preventDefault();
  let target = event.target;

  if (target.classList.contains('colors-menu__button')) {
    setWidth(target);
  } else if (target.classList.contains('colors-menu__title')) {
    setWidth(target.parentNode);
  }
})