// const colorsButton = $('.colors-menu__button');
// const colorsItem = $('.colors-menu__item');
// const colorsContent = $('.colors-menu__content');

// colorsButton.on('click', function(event) {
//   event.preventDefault();

// // //это с помощью навешивания классов
// //   if ($(this).parent().hasClass('colors-menu__item--active')) {
// //     $(this).parent().removeClass('colors-menu__item--active');
// //   } else {
// //     colorsItem.removeClass('colors-menu__item--active');
// //     $(this).parent().addClass('colors-menu__item--active');
// //   }

// //это с помощью предварительно заданной ширины в css
//   const targetWidth = $(this).next().find('.colors-menu__text').outerWidth();
  
//   if ($(this).next().outerWidth() !== 0) {
//     $(this).next().outerWidth(0);
//   } else {
//     colorsContent.outerWidth(0);
//     $(this).next().outerWidth(targetWidth);    
//   }

// })

// const menu = $('#horizontalMenu'); //при делегировании метод target иногда попадает на заголовок внутри кнопки и в этом случае надо весь код переписывать
const colorsButton = $('.colors-menu__button')
const items = $('.colors-menu__item');

const getItemWidth = function(item) {
  let getResultWidth = 524; //по умолчанию берем значение для десктопов

  const windowWidth = window.innerWidth;
  const itemWidth = $(item).outerWidth(); //или в ванильном js: item.offsetWidth

  const isTablet = window.matchMedia("(max-width: 768px)").matches;
  const isMobile = window.matchMedia("(max-width: 480px)").matches;

  if (isTablet) {
    getResultWidth = windowWidth - itemWidth * (items).length;
  }
  if (isMobile) {
    getResultWidth = windowWidth - itemWidth;
  }
  return getResultWidth;
}

const setItemWidth = function(item, width) {
  const itemContent = $(item).next();
  const itemText = $(item).next().children();

  itemContent.outerWidth(width);
}

const openItem = function(item) {
  const itemContent = $(item).next();
  const itemText = $(item).next().children();
  const itemParent = $(item).parent();

  const width = getItemWidth(item);
  itemText.outerWidth(width);
  itemContent.outerWidth(width);
  $(item).addClass('colors-menu__button--active');
  $(itemParent).addClass('colors-menu__item--active');
}

const closeItem = function(item) {
  const itemParent = $(item).parent();
  setItemWidth(item, 0);
  $(item).removeClass('colors-menu__button--active');
  $(itemParent).removeClass('colors-menu__item--active');
}

colorsButton.on('click', function(event) {
  event.preventDefault();
  // const target = event.target;
  const isActive = $(this).hasClass('colors-menu__button--active');
  const activeElement = $('.colors-menu__button--active');

  if ($(this).hasClass('colors-menu__button') && isActive) {
    closeItem(this);
  } if ($(this).hasClass('colors-menu__button') && !isActive) {
    closeItem(activeElement);
    openItem(this);
  }
})

$(window).resize(function() {
  const activeButton = $('.colors-menu__button--active');
  if (activeButton) {
    closeItem(activeButton);
  }
})

