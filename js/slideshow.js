let feedback = document.querySelectorAll('.single-feedback');
let avatars = document.querySelectorAll('.interactive-avatar');
let switcher = document.querySelector('#interactive-avatars');

switcher.addEventListener('click', event =>{
  event.preventDefault();
  const target = event.target;

  if (target.classList.contains('interactive-avatar__link')) {

    let avatar = target.parentNode;
    let id = avatar.getAttribute('data-open');
    
    for (let avatar of avatars) {
      avatar.classList.remove('interactive-avatar--active');
    }
    avatar.classList.add('interactive-avatar--active');
    
    feedback.forEach(oneFeedback => {
      oneFeedback.classList.remove('single-feedback--active');
      if (oneFeedback.getAttribute('data-item') === id) {
        oneFeedback.classList.add('single-feedback--active');
      }
    })
  }
})