let feedback = $('.single-feedback');
let avatars = $('#interactive-avatars');
// let avatar = $('.interactive-avatar__link');

// $(avatar).each(function(ndx, item) {
//   $(this).on('click', function(event) {
//     event.preventDefault();
//     $(feedback).eq(ndx).addClass('single-feedback--active').siblings().removeClass('single-feedback--active');
//     $(avatar).eq(ndx).closest('.interactive-avatar').addClass('interactive-avatar--active').siblings().removeClass('interactive-avatar--active');
//   })
// })

//сделала с помощью делегирования

$(avatars).on('click', event =>{
  event.preventDefault();
  const target = event.target;

  if ($(target).hasClass('interactive-avatar__pic')) {
    $(target).closest('.interactive-avatar').addClass('interactive-avatar--active').siblings().removeClass('interactive-avatar--active')
    let id = $(target).closest('.interactive-avatar').attr('data-open');
    
    $(feedback).each(function(item) {
      if($(this).attr('data-item') == id) {
        $(this).addClass('single-feedback--active').siblings().removeClass('single-feedback--active');
      }
    })
  }


})