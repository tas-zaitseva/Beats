// const { LibManifestPlugin } = require("webpack");

const mobileDetect = new MobileDetect(window.navigator.userAgent);
const isMobile = mobileDetect.mobile();
// let slider;

// if (isMobile) {
//   slider = $('.products__list').bxSlider({
//     pager: false,
//     controls: false
//   });
// } else {
//   slider = $('.products__list').bxSlider({
//     pager: false,
//     controls: false,
//     touchEnabled: false
//   });
// }


// $('.slider__arrow--direction-prev').on('click', function(event) {
//   event.preventDefault();
//   slider.goToPrevSlide();
// })

// $('.slider__arrow--direction-next').on('click', function(event) {
//   event.preventDefault();
//   slider.goToNextSlide();
// })



document.addEventListener('DOMContentLoaded', function() {
  const slider = document.querySelector('.products__list');
  const sliderList = document.querySelectorAll('.products__item');
  const display = document.querySelector('.slider__display');
  
  const arrows = document.querySelectorAll('.slider__arrow');
  const arrowPrev = document.querySelector('.slider__arrow--direction-prev');
  const arrowNext = document.querySelector('.slider__arrow--direction-next');

  let step;
  function getSliderWidth() {
    return parseInt(window.getComputedStyle(display).width);
  }
  step = getSliderWidth();
  //расчет стилей без жесткой привязки к количеству товаров
  slider.style.width = `${sliderList.length * 100}%`;
  slider.style.gridTemplateColumns = `repeat(${sliderList.length}, 1fr)`;
  
  let counter = 0;
  let counterMax = sliderList.length - 1;
  
  function moveSlide(step) {
    let currentRight = parseInt(window.getComputedStyle(slider).right)
    slider.style.right = `${currentRight + step}px`;
  }

  arrowPrev.addEventListener('click', (event)=> {
    event.preventDefault();
    if (counter > 0) {
      moveSlide(-step);
      counter -= 1;
      arrows.forEach (arrow => {arrow.classList.remove('unactive')});
    }
    if (counter === 0) {
      arrowPrev.classList.add('unactive');
    }
  })
  
  arrowNext.addEventListener('click', (event)=> {
    event.preventDefault();
    if (counter < counterMax) {
      moveSlide(step);
      counter += 1;
      arrows.forEach (arrow => {arrow.classList.remove('unactive')});
    }
    if (counter === counterMax) {
      arrowNext.classList.add('unactive');
    }
  })
  
  
  window.addEventListener('resize', ()=> {
    step = getSliderWidth();
    slider.style.right = 0;
    arrows.forEach (arrow => {arrow.classList.remove('unactive')});
    arrowPrev.classList.add('unactive');
    counter = 0;
  })
})