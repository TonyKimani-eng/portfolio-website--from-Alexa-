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


/* ===== Scroll animations (AOS) ===== */
function initScrollAnimations() {
  if (typeof AOS === 'undefined') return;

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  AOS.init({
    duration: 780,
    easing: 'ease-out-cubic',
    once: true,
    offset: 90,
    delay: 0,
    disable: reducedMotion,
  });
}

window.addEventListener('load', initScrollAnimations);


/* ===== Hero typing animation ===== */
const typingElement = document.getElementById('typing-text');
const typingRoles = ['Software Developer', 'Engineer', 'Problem Solver'];
let typingRoleIndex = 0;
let typingCharacterIndex = 0;
let deletingRole = false;

function runTypingAnimation() {
  if (!typingElement) return;

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reducedMotion) {
    typingElement.textContent = typingRoles[0];
    return;
  }

  const currentRole = typingRoles[typingRoleIndex];

  if (!deletingRole) {
    typingCharacterIndex += 1;
    typingElement.textContent = currentRole.slice(0, typingCharacterIndex);

    if (typingCharacterIndex === currentRole.length) {
      deletingRole = true;
      setTimeout(runTypingAnimation, 1350);
      return;
    }
  } else {
    typingCharacterIndex -= 1;
    typingElement.textContent = currentRole.slice(0, typingCharacterIndex);

    if (typingCharacterIndex === 0) {
      deletingRole = false;
      typingRoleIndex = (typingRoleIndex + 1) % typingRoles.length;
    }
  }

  const typingSpeed = deletingRole ? 45 : 95;
  setTimeout(runTypingAnimation, typingSpeed);
}

window.addEventListener('load', runTypingAnimation);

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

/* ===== Interactive profile image tilt ===== */
const heroProfile = document.querySelector('.hero__profile');
const heroAvatar = document.querySelector('.hero__avatar');
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (heroProfile && heroAvatar && !prefersReducedMotion) {
  heroProfile.addEventListener('mousemove', (event) => {
    const bounds = heroProfile.getBoundingClientRect();
    const x = ((event.clientX - bounds.left) / bounds.width - 0.5) * 2;
    const y = ((event.clientY - bounds.top) / bounds.height - 0.5) * 2;

    heroAvatar.style.transform = `scale(1.03) rotate(${-x * 1.1}deg) translateY(-2px)`;
    heroProfile.style.transform = `translateY(-5px) rotateX(${y * -1.2}deg) rotateY(${x * 1.2}deg)`;
  });

  heroProfile.addEventListener('mouseleave', () => {
    heroAvatar.style.transform = '';
    heroProfile.style.transform = '';
  });
}

/* ===== Skills scroll reveal ===== */
const skillRevealItems = document.querySelectorAll('.skill-reveal');

if (!prefersReducedMotion && 'IntersectionObserver' in window && skillRevealItems.length) {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.2,
      rootMargin: '0px 0px -30px 0px',
    }
  );

  skillRevealItems.forEach((item) => revealObserver.observe(item));
} else {
  skillRevealItems.forEach((item) => item.classList.add('is-visible'));
}
