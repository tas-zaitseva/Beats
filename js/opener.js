let buttons = document.querySelectorAll('.team-member__button');
let descriptions = document.querySelectorAll('.team-member__description');
let openers = document.querySelectorAll('.opener');

function removeOpenerClass() {
  for (let opener of openers) {
    opener.classList.remove('opener--active');
  }
}

function nullDescriptionHeight() {
  for (let description of descriptions) {
    description.style.height = 0;
  }
}

for (let button of buttons) {
  let description = button.nextElementSibling;
  let innerContent = description.querySelector('.team-member__inner-content');
  let opener = button.querySelector('.opener');


  button.addEventListener('click', function() {
    if (description.offsetHeight === 0) {
      nullDescriptionHeight();
      let reqHeight = innerContent.offsetHeight;
      description.style.height = `${reqHeight}px`;
    } else {
      description.style.height = 0;
    }

    if (opener.classList.contains('opener--active')) {
      opener.classList.remove('opener--active');
      removeOpenerClass();
    } else {
      opener.classList.add('opener--active');
    }
  })
}

window.addEventListener('resize', ()=> {
  nullDescriptionHeight();
  removeOpenerClass();
})