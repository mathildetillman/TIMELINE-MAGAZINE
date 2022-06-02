const navSlide = () => {
  const burger = document.querySelector(".burger");
  const nav = document.querySelector(".nav-links");
  const navLinks = document.querySelectorAll(".nav-links li");

  burger.addEventListener("click", () => {
    nav.classList.toggle("nav-active");

    navLinks.forEach((link, index) => {
      if (link.style.animation) {
        link.style.animation = "";
      } else {
        link.style.animation = `navLinkFade 0.5s ease forwards ${
          index / 7 + 0.3
        }s `;
      }
    });
    burger.classList.toggle("toggle");
  });
};
const parallax = () => {
  window.addEventListener("scroll", () => {
    const parallax = document.querySelector(".parallax");
    let scrollPosition = window.pageYOffset;

    parallax.style.transform = "translateY(" + scrollPosition * 0.1 + "px)";
  });
};

navSlide();
