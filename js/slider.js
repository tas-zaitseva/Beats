const mobileDetect = new MobileDetect(window.navigator.userAgent);
const isMobile = mobileDetect.mobile();

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
  
  let inMove = false;
  function stopEventWhileMove() {
    setTimeout(() => {
      inMove = false;
    }, 500);
  }

  function moveSlide(target) {
    if (inMove === false) {
      inMove = true;
      
      let currentRight = parseInt(window.getComputedStyle(slider).right);
      arrows.forEach (arrow => {arrow.classList.remove('unactive')});
  
      if (target === arrowPrev) {
        if (counter > 0) {
          slider.style.right = `${currentRight - step}px`;
          counter -= 1;
        }
        if (counter === 0) {
          target.classList.add('unactive');
        }
        
      } else if (target === arrowNext) {
        if (counter < counterMax) {
          slider.style.right = `${currentRight + step}px`;
          counter += 1;

        }
        if (counter === counterMax) {
          target.classList.add('unactive');
        }
      }
      stopEventWhileMove();
    }
  }

  arrowPrev.addEventListener('click', (event)=> {
    event.preventDefault();
    moveSlide(arrowPrev);
  })
  
  arrowNext.addEventListener('click', (event)=> {
    event.preventDefault();
    moveSlide(arrowNext);
  })
  
  
  if (isMobile) {
    let startX = null, startY = null;
    
    const touchPlace = document.querySelector('.products__list');
    touchPlace.addEventListener('touchstart', handleTouchStart);
    touchPlace.addEventListener('touchmove', handleTouchMove);
    touchPlace.addEventListener('touchend', handleTouchEnd);

    function handleTouchStart(event) {
      startX = event.touches[0].clientX;
      startY = event.touches[0].clientY;
    }

    function handleTouchMove(event) {
      event.preventDefault();
      let endX = event.touches[0].clientX;
      let endY = event.touches[0].clientY;
  
      let xDiff = endX - startX;
      let yDiff = endY - startY;

      if (Math.abs(xDiff) > Math.abs(yDiff)) {
        if (xDiff < 0) {
          moveSlide(arrowNext);
        } else {
          moveSlide(arrowPrev);
        }
      }
    }

    function handleTouchEnd() {
      startX = null;
      startY = null;
    }
  }

  window.addEventListener('resize', ()=> {
    step = getSliderWidth();
    slider.style.right = 0;
    arrows.forEach(arrow => {arrow.classList.remove('unactive')});
    arrowPrev.classList.add('unactive');
    counter = 0;
  })
})