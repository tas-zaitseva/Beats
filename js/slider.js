// $('.slider__arrow').on('click', function(event) {
//   event.preventDefault();
//   $('.product').toggleClass('product--hidden');
// })

const slider = $('.products__list').bxSlider({
  pager: false,
  controls: false
});

$('.slider__arrow--direction-prev').on('click', function(event) {
  event.preventDefault();
  slider.goToPrevSlide();
})

$('.slider__arrow--direction-next').on('click', function(event) {
  event.preventDefault();
  slider.goToNextSlide();
})