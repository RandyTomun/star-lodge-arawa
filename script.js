const photoStyles = document.createElement('link');
photoStyles.rel = 'stylesheet';
photoStyles.href = 'gallery.css';
document.head.appendChild(photoStyles);

const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.main-nav');

if (menuToggle && nav) {
  menuToggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', String(isOpen));
  });

  nav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('open');
      menuToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

const year = document.getElementById('year');
if (year) year.textContent = new Date().getFullYear();

const floatingWhatsapp = document.createElement('a');
floatingWhatsapp.className = 'float-whatsapp';
floatingWhatsapp.href = 'https://wa.me/67572835502';
floatingWhatsapp.target = '_blank';
floatingWhatsapp.rel = 'noopener';
floatingWhatsapp.setAttribute('aria-label', 'Book Star Lodge via WhatsApp');
floatingWhatsapp.innerHTML = '<span>Book via WhatsApp</span>';
document.body.appendChild(floatingWhatsapp);

const galleryImages = document.querySelectorAll('.photo-gallery img');
if (galleryImages.length) {
  const lightbox = document.createElement('div');
  lightbox.className = 'photo-lightbox';
  lightbox.setAttribute('role', 'dialog');
  lightbox.setAttribute('aria-modal', 'true');
  lightbox.innerHTML = '<button class="lightbox-close" aria-label="Close image">×</button><img alt=""><div class="lightbox-caption"></div>';
  document.body.appendChild(lightbox);

  const lightboxImage = lightbox.querySelector('img');
  const lightboxCaption = lightbox.querySelector('.lightbox-caption');
  const closeButton = lightbox.querySelector('.lightbox-close');

  const closeLightbox = () => {
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
  };

  galleryImages.forEach(img => {
    img.setAttribute('tabindex', '0');
    const openImage = () => {
      lightboxImage.src = img.src;
      lightboxImage.alt = img.alt || 'Star Lodge Arawa photo';
      lightboxCaption.textContent = img.alt || 'Star Lodge Arawa';
      lightbox.classList.add('open');
      document.body.style.overflow = 'hidden';
      closeButton.focus();
    };
    img.addEventListener('click', openImage);
    img.addEventListener('keydown', event => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        openImage();
      }
    });
  });

  closeButton.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', event => {
    if (event.target === lightbox) closeLightbox();
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && lightbox.classList.contains('open')) closeLightbox();
  });
}
