const form = document.querySelector('.form');
const button = document.querySelector('#submit');

function validateFields(someForm, fieldsArray) {
  
  for (field of fieldsArray) {
    field.classList.remove('input-error');
    if (field.value.trim() === "") {
      field.classList.add('input-error');
    }
  }

  const errorFields = [...someForm.elements].filter((element) => (element.classList.contains('input-error')));
  return errorFields.length === 0;
}

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
    
    function showModal(text, error) {
      modal.textContent = text;
      if (error) {
        modal.classList.add('modal__content--error');
      }
      overlay.classList.add('overlay--shown');
    
      closeOverlay.addEventListener('click', (event)=> {
        event.preventDefault();
        overlay.classList.remove('overlay--shown'); 
      })
    }

    const xhr = new XMLHttpRequest;
    xhr.open('POST', 'https://webdev-api.loftschool.com/sendmail');
    xhr.setRequestHeader('content-type', 'application/json');
    xhr.send(JSON.stringify(data));
    xhr.responseType = 'json';

    xhr.addEventListener('load', ()=> {
      if (xhr.status < 400) {
        showModal(xhr.response.message);
        form.reset();
      } else {
        showModal('Не удалось отправить сообщение', true);
      }
    })

    xhr.addEventListener('error', ()=> {
      showModal('Не удалось отправить сообщение', true);
    })
  }
})








