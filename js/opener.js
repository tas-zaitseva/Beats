// $('.team-member__button').on('click', function() {

//   if ($(this).find('.opener').hasClass('opener--active')) {
//     $(this).find('.opener').removeClass('opener--active');
//   } else {
//     $('.opener').removeClass('opener--active');
//     $(this).find('.opener').addClass('opener--active');
//   }

//   if ($(this).next('.team-member__description').hasClass('team-member__description--active')) {
//     $(this).next('.team-member__description').removeClass('team-member__description--active');
//   } else {
//     $('.team-member__description').removeClass('team-member__description--active');
//     $(this).next('.team-member__description').addClass('team-member__description--active');
//   }
// })

$('.team-member__button').on('click', function() {

  if ($(this).next().height() !== 0) {
    $(this).next().height(0);
  } else {
    $('.team-member__description').height(0);
    let reqHeight = $(this).next().find('.team-member__inner-content').height();
    $(this).next().height(reqHeight);
  }

  if ($(this).find('.opener').hasClass('opener--active')) {
    $(this).find('.opener').removeClass('opener--active');
  } else {
    $('.opener').removeClass('opener--active');
    $(this).find('.opener').addClass('opener--active');
  }
})

$(window).resize(function() {
  $('.team-member__description').height(0);
  $('.opener').removeClass('opener--active');
})