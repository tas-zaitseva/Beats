// $('.slider__arrow').on('click', function(event) {
//   event.preventDefault();
//   $('.product').toggleClass('product--hidden');
// })

const mobileDetect = new MobileDetect(window.navigator.userAgent);
const isMobile = mobileDetect.mobile();
let slider;

if (isMobile) {
  slider = $('.products__list').bxSlider({
    pager: false,
    controls: false
  });
} else {
  slider = $('.products__list').bxSlider({
    pager: false,
    controls: false,
    touchEnabled: false
  });
}


$('.slider__arrow--direction-prev').on('click', function(event) {
  event.preventDefault();
  slider.goToPrevSlide();
})

$('.slider__arrow--direction-next').on('click', function(event) {
  event.preventDefault();
  slider.goToNextSlide();
})
