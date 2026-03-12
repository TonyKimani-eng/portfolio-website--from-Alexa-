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

/* ===== Projects galleries (Swiper) ===== */
const projectGalleries = document.querySelectorAll('.project-gallery');

projectGalleries.forEach((gallery) => {
  const gallerySwiper = new Swiper(gallery, {
    loop: true,
    speed: 1200,
    spaceBetween: 8,
    slidesPerView: 1.15,
    grabCursor: true,
    autoplay: {
      delay: 2800,
      disableOnInteraction: false,
      pauseOnMouseEnter: true,
    },
    breakpoints: {
      640: {
        slidesPerView: 1.35,
      },
      1024: {
        slidesPerView: 1.15,
      },
    },
  });

  // Pause while hovered and resume on mouse leave for clarity.
  gallery.addEventListener('mouseenter', () => gallerySwiper.autoplay.stop());
  gallery.addEventListener('mouseleave', () => gallerySwiper.autoplay.start());
});

/* ===== Click-to-preview modal for project images ===== */
const modal = document.getElementById('gallery-modal');
const modalImage = document.getElementById('gallery-modal-image');
const modalClose = document.getElementById('gallery-modal-close');
const galleryImages = document.querySelectorAll('.gallery__image');

function closeGalleryModal() {
  if (!modal) return;

  modal.classList.remove('show');
  modal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

if (modal && modalImage) {
  galleryImages.forEach((image) => {
    image.addEventListener('click', () => {
      modalImage.src = image.src;
      modalImage.alt = image.alt;
      modal.classList.add('show');
      modal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    });
  });
}

modalClose?.addEventListener('click', closeGalleryModal);
modal?.addEventListener('click', (event) => {
  if (event.target === modal) {
    closeGalleryModal();
  }
});

window.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    closeGalleryModal();
  }
});
