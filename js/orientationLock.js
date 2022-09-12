document.addEventListener('DOMContentLoaded', ()=> {
  screen.addEventListener("orientationchange", function () {
    alert("Ориентация такая: " + screen.orientation);
  });
  // console.log(screen);
  // console.log(screen.orientation);
})