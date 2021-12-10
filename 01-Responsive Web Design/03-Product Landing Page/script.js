////////////////////////////////////
///////////////////////////////////
// MAKING MOBILE NAVIGATION WORK
//////////////////////////////////
/////////////////////////////////
const headerEl = document.querySelector(".header");
const btnNav = document.querySelector(".btn-mobile-nav");
btnNav.addEventListener("click", function () {
  headerEl.classList.toggle("nav-open");
});
