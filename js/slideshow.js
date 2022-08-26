let feedback = $('.single-feedback');
let avatars = $('#interactive-avatars');

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