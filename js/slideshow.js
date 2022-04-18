let feedback = $('.single-feedback');
// let avatar = $('.interactive-avatar'); в этом случае, когда как элемент клика я выбирала li, а не ссылку...
let avatar = $('.interactive-avatar__link');

$(avatar).each(function(ndx, item) {
  $(this).on('click', function(event) {
    event.preventDefault(); //...preventDefault срабатывал как на ссылке, хотя сам элемент - ее родитель. Происходит погружение?
    $(feedback).eq(ndx).addClass('single-feedback--active').siblings().removeClass('single-feedback--active');
    $(avatar).eq(ndx).closest('.interactive-avatar').addClass('interactive-avatar--active').siblings().removeClass('interactive-avatar--active');
  })
})