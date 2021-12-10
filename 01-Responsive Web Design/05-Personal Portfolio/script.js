//////////////////////////////////////////
//////////////////////////////////////////
// IMPLEMENT SMOOTH SCROLLING
//////////////////////////////////////////
//////////////////////////////////////////
const allLinks = document.querySelectorAll(".nav-link:link");
allLinks.forEach(function (a) {
  a.addEventListener("click", function (e) {
    e.preventDefault();
    const href = a.getAttribute("href");
    if (href != "#" && href.startsWith("#")) {
      const sectionEl = document.querySelector(href);
      sectionEl.scrollIntoView({
        behavior: "smooth",
      });
    }
  });
  console.log("Hello");
});

//////////////////////////////////////////
//////////////////////////////////////////
// MAKE DESCRIPTION BUTTONS WORK
//////////////////////////////////////////
//////////////////////////////////////////
const descShort = document.querySelector(".desc--short");
const btnShort = document.querySelector(".btn--short");

const descMed = document.querySelector(".desc--med");
const btnMed = document.querySelector(".btn--med");

const descLong = document.querySelector(".desc--long");
const btnLong = document.querySelector(".btn--long");

btnShort.addEventListener("click", function () {
  btnShort.classList.add("btn-selected");
  btnMed.classList.remove("btn-selected");
  btnLong.classList.remove("btn-selected");

  descMed.classList.remove("desc-show");
  descLong.classList.remove("desc-show");
});

btnMed.addEventListener("click", function () {
  btnMed.classList.add("btn-selected");
  btnShort.classList.remove("btn-selected");
  btnLong.classList.remove("btn-selected");

  descMed.classList.add("desc-show");
  descLong.classList.remove("desc-show");
});

btnLong.addEventListener("click", function () {
  btnLong.classList.add("btn-selected");
  btnShort.classList.remove("btn-selected");
  btnMed.classList.remove("btn-selected");

  descMed.classList.add("desc-show");
  descLong.classList.add("desc-show");
});
