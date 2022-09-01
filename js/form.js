const form = document.querySelector('.form');
const button = document.querySelector('#submit');

function validateFields(someForm, fieldsArray) {
  
  for (field of fieldsArray) {
    field.classList.remove('input-error');
    if (field.value.trim() === "") {
      field.classList.add('input-error');
    }
  }
  // const errorFields = $(someForm).find('.input-error');
  const errorFields = [...someForm.elements].filter((element) => (element.classList.contains('input-error')));
  return errorFields.length === 0;
}


// $('.form').submit(event => {
//   event.preventDefault();
  
//   const overlay = $('.overlay');
//   const closeOverlay = $('.js-close-overlay');

//   const name = form.elements.name;
//   const phone = form.elements.phone;
//   const comment = form.elements.comment;
//   const to = form.elements.to;

//   $('.modal__content').removeClass('modal__content--error');
  
//   const isValid = validateFields(form, [name, phone, comment, to]);

//   if (isValid) {

//     const data = {
//       name: name.value,
//       phone: phone.value,
//       comment: comment.value,
//       to: to.value
//     }
  
//     $.ajax({
//       url: "https://webdev-api.loftschool.com/sendmail",
//       method: "POST",
//       data: data,
//       success: function(data) {
//         $(overlay).addClass('overlay--shown').find('.modal__content').text(data.message);
        
//         closeOverlay.on('click', event => {
//           event.preventDefault();
//           $(overlay).removeClass('overlay--shown');
//         })

//         form.reset();
//       },
//       error: function(data) {
//         $(overlay).addClass('overlay--shown').find('.modal__content').addClass('modal__content--error').text('Не удалось отправить сообщение');
        
//         closeOverlay.on('click', event => {
//           event.preventDefault();
//           $(overlay).removeClass('overlay--shown');
//         })
//       }
//     })
//   }
// })

form.addEventListener('submit', function(event) {
  event.preventDefault();
  
  const overlay = document.querySelector('.overlay');
  const closeOverlay = document.querySelector('.js-close-overlay');
  
  const name = form.elements.name;
  const phone = form.elements.phone;
  const comment = form.elements.comment;
  const to = form.elements.to;
  
  const modal = document.querySelector('.modal__content');
  modal.classList.remove('modal__content--error');
  
  const isValid = validateFields(form, [name, phone, comment, to]);

  if (isValid) {
    const data = {
      name: name.value,
      phone: phone.value,
      comment: comment.value,
      to: to.value
    }

    const xhr = new XMLHttpRequest;
    xhr.open('POST', 'https://webdev-api.loftschool.com/sendmail');
    xhr.setRequestHeader('content-type', 'application/json');
    xhr.send(JSON.stringify(data));
    xhr.responseType = 'json';

    xhr.addEventListener('load', ()=> {
      if (xhr.status < 400) {
        modal.textContent = xhr.response.message;
        overlay.classList.add('overlay--shown');

        closeOverlay.addEventListener('click', (event)=> {
          event.preventDefault();
          overlay.classList.remove('overlay--shown');

          form.reset();
        })
      } else {
          modal.textContent = 'Не удалось отправить сообщение';
          modal.classList.add('modal__content--error');
          overlay.classList.add('overlay--shown');

          closeOverlay.addEventListener('click', (event)=> {
            event.preventDefault();
            overlay.classList.remove('overlay--shown');
          })
      }
    })
  }




})








