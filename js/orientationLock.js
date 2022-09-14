// document.addEventListener('DOMContentLoaded', ()=> {

//   if (isMobile){
//     function lock(orientation) {
//       let doc = document.documentElement;
//       if (doc.requestFullscreen) { 
//         doc.requestFullscreen().then(result => {
//           screen.orientation.lock(orientation);
//         }, error => {
//           console.log('failure');
//         });
//       }
//       else if (doc.webkitRequestFullscreen) {
//         doc.webkitRequestFullscreen().then(result => {
//           screen.orientation.lock(orientation);
//         }, error => {
//           console.log('failure');
//         });
//       }
//       else if (doc.mozRequestFullscreen) { 
//         doc.mozRequestFullscreen().then(result => {
//           screen.orientation.lock(orientation);
//         }, error => {
//           console.log('failure');
//         });
//       }
//       else if (doc.msRequestFullscreen) {
//         doc.msRequestFullscreen().then(result => {
//           screen.orientation.lock(orientation);
//         }, error => {
//           console.log('failure');
//         }); 
//       }
      
//     }
    
//     function checkOrientation() {
//       if (window.orientation === 90 || 180 || 270) {
//         lock('portrait');
//       }
//     }
  
//     window.addEventListener("orientationchange", checkOrientation);

//   }
  
  
// })