const navMenu = document.getElementById('nav-menu');
const navToggle = document.getElementById('nav-toggle');
const navLinks = document.querySelectorAll('.nav__link');
const sections = document.querySelectorAll('main section[id]');
const yearSpan = document.getElementById('year');

if (navToggle && navMenu) {
  navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('show-menu');
  });
}

navLinks.forEach((link) => {
  link.addEventListener('click', () => {
    navMenu?.classList.remove('show-menu');
  });
});

function updateActiveLink() {
  const scrollY = window.scrollY + 120;

  sections.forEach((section) => {
    const sectionHeight = section.offsetHeight;
    const sectionTop = section.offsetTop;
    const sectionId = section.getAttribute('id');
    const targetLink = document.querySelector(`.nav__menu a[href*="${sectionId}"]`);

    if (!targetLink) return;

    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      targetLink.classList.add('active-link');
    } else {
      targetLink.classList.remove('active-link');
    }
  });
}

window.addEventListener('scroll', updateActiveLink);
window.addEventListener('load', updateActiveLink);

if (yearSpan) {
  yearSpan.textContent = new Date().getFullYear();
}
