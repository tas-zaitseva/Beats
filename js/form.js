const form = document.querySelector('.form');
const button = document.querySelector('#submit');

function validateFields (someForm, fieldsArray) {
  
  for (field of fieldsArray) {
    field.classList.remove('input-error');
    if (field.value.trim()=="") {
      field.classList.add('input-error');
    }
  }
  const errorFields = $(someForm).find('.input-error');
  return errorFields.length == 0;
}


$('.form').submit(event => {
  event.preventDefault();
  
  const overlay = $('.overlay');
  const closeOverlay = $('.js-close-overlay');

  const name = form.elements.name;
  const phone = form.elements.phone;
  const comment = form.elements.comment;
  const to = form.elements.to;

  $('.modal__content').removeClass('modal__content--error');
  
  const isValid = validateFields(form, [name, phone, comment, to]);

  if (isValid) {

    const data = {
      name: name.value,
      phone: phone.value,
      comment: comment.value,
      to: to.value
    }
  
    $.ajax({
      url: "https://webdev-api.loftschool.com/sendmail",
      method: "POST",
      data: data,
      success: function(data) {
        $(overlay).addClass('overlay--shown').find('.modal__content').text(data.message);
        
        closeOverlay.on('click', event => {
          event.preventDefault();
          $(overlay).removeClass('overlay--shown');
        })
      },
      error: function(data) {
        $(overlay).addClass('overlay--shown').find('.modal__content').addClass('modal__content--error').text(data.responseJSON.message);
        
        closeOverlay.on('click', event => {
          event.preventDefault();
          $(overlay).removeClass('overlay--shown');
        })
      }
    })
  }
})








