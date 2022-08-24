export default scrollToSection;


const sections = document.querySelectorAll('section');
const display = document.querySelector('.main-content');

const sideMenu = document.querySelector('.sidebar').querySelectorAll('.sidebar__menu-link');
const allMenu = document.querySelectorAll('[data-link]');

let inScroll = false;

window.addEventListener('wheel', function(event) {
  const activeSection = document.querySelector('.active-section');

  if (inScroll === false) {
    inScroll = true;
    if (event.deltaY > 0 && activeSection.nextElementSibling) {
      const dataLink = activeSection.nextElementSibling.dataset.open;
      scrollToSection(dataLink);
      styleSideMenu(dataLink);
      
    } else if (event.deltaY < 0 && activeSection.previousElementSibling) {
      const dataLink = activeSection.previousElementSibling.dataset.open;
      scrollToSection(dataLink);
      styleSideMenu(dataLink);
    }
    setTimeout(() => {
      inScroll = false;
    }, 1100);
    
    setTimeout(() => {
      styleSideLighter();
    }, 300);
  }
});

const mobileDetect = new MobileDetect(window.navigator.userAgent);
const isMobile = mobileDetect.mobile();

if (isMobile) {
  //https://github.com/mattbryson/TouchSwipe-Jquery-Plugin
  $(function() {
    $("body").swipe( {
      swipe:function(event, direction) {
        const activeSection = document.querySelector('.active-section');
        if (direction === 'up' && activeSection.nextElementSibling) {
          const dataLink = activeSection.nextElementSibling.dataset.open;
          scrollToSection(dataLink);
        } else if (direction === 'down' && activeSection.previousElementSibling) {
          const dataLink = activeSection.previousElementSibling.dataset.open;
          scrollToSection(dataLink);
        }
      }
    });
  });

  const wrapper = document.querySelector('.wrapper');
  wrapper.addEventListener('touchmove', (event) => {
    event.preventDefault();
  })
}

window.addEventListener('keydown', function(event) {
  const activeSection = document.querySelector('.active-section');
  const userTypingInInput = event.target.tagName == 'TEXTAREA' || event.target.tagName == 'INPUT';
  if (userTypingInInput) {
    return;
  } else {
    if (event.key === 'ArrowDown' && activeSection.nextElementSibling) {
      const dataLink = activeSection.nextElementSibling.dataset.open;
      scrollToSection(dataLink);
      styleSideMenu(dataLink);
      setTimeout(() => {
        styleSideLighter();
      }, 300);
    
    } else if (event.key === 'ArrowUp' && activeSection.previousElementSibling) {
      const dataLink = activeSection.previousElementSibling.dataset.open;
      scrollToSection(dataLink);
      styleSideMenu(dataLink);
      setTimeout(() => {
        styleSideLighter();
      }, 300);
    }
  }
})

allMenu.forEach(link => {
  link.addEventListener('click', function(event) {
    event.preventDefault();
    scrollToSection(link.dataset.link);
    setTimeout(() => {
      styleSideLighter();
    }, 300);
  })
});

function scrollToSection(dataLink) {
  sections.forEach((section, ndx) => {
    section.classList.remove('active-section');
    if (section.dataset.open === dataLink) {
      section.classList.add('active-section');
      display.style.transform = `translateY(-${(ndx)* 100}%)`;
    }
  });
  styleSideMenu(dataLink);
}

function styleSideMenu(dataLink) {
  sideMenu.forEach(link => {
    link.classList.remove('sidebar__menu-link--active');
    if (link.dataset.link === dataLink) {
      link.classList.add('sidebar__menu-link--active');
    }
  });
}

function styleSideLighter() {
  const activeSection = document.querySelector('.active-section');
  const sidebar = document.querySelector('.sidebar');

  if (activeSection.dataset.theme === 'dark') {
    sidebar.classList.add('sidebar__menu--dark');
  } else {
    sidebar.classList.remove('sidebar__menu--dark');
  }
}


