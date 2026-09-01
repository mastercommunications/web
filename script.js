const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.site-nav');
const modal = document.querySelector('.modal');

document.querySelectorAll('.nav-contact, [href="contact.html"], .contact-link').forEach((link) => link.remove());

const brandIntro = document.querySelector('.brand-intro');
const brandLockup = document.querySelector('.brand-intro-stack');
if (brandIntro && brandLockup) {
  const updateBrandIntro = () => {
    const progress = Math.min(window.scrollY / (brandIntro.offsetHeight * .72), 1);
    brandLockup.style.transform = `scale(${1 + progress * 1.25})`;
    brandLockup.style.opacity = `${1 - progress}`;
    brandIntro.style.setProperty('--intro-fade', progress);
  };
  window.addEventListener('scroll', updateBrandIntro, { passive: true });
  updateBrandIntro();
}

const detailMain = document.querySelector('.detail-page main');
const detailHero = detailMain?.querySelector('.detail-hero');
const videoSection = detailMain?.querySelector('.video-section');
if (detailMain && detailHero && videoSection) {
  detailMain.insertBefore(videoSection, detailHero);
}

const projectPages = {
  'IMG-20260826-WA0025.jpg': 'omar.html',
  'IMG-20260826-WA0023.jpg': 'featured-natok.html',
  'IMG-20260826-WA0024.jpg': 'nabik.html',
  'IMG-20260826-WA0027.jpg': 'tui.html',
  'IMG-20260826-WA0026.jpg': 'danger-bou.html',
  'IMG-20260826-WA0028.jpg': 'danger-bou.html',
  'IMG-20260826-WA0030.jpg': 'danger-bou.html',
  'IMG-20260826-WA0031.jpg': 'betar-prem.html',
  'IMG-20260826-WA0038.jpg': 'omar.html'
};

const posterDetails = {
  'IMG-20260826-WA0023.jpg': ['Barir Choto Chele', 'Natok'],
  'IMG-20260826-WA0024.jpg': ['Nabik', 'Natok'],
  'IMG-20260826-WA0026.jpg': ['Danger Bou', 'Natok'],
  'IMG-20260826-WA0027.jpg': ['Tui', 'Natok'],
  'IMG-20260826-WA0028.jpg': ['Danger Bou', 'Natok'],
  'IMG-20260826-WA0029.jpg': ['Tui', 'Natok'],
  'IMG-20260826-WA0030.jpg': ['Danger Bou', 'Natok'],
  'IMG-20260826-WA0031.jpg': ['Betar Prem', 'Natok'],
  'IMG-20260826-WA0032.jpg': ['Tui', 'Natok'],
  'IMG-20260826-WA0035.jpg': ['OMAR / Streaming', 'Film'],
  'IMG-20260826-WA0037.jpg': ['OMAR / Denmark', 'Film']
};

const posterGroups = {
  'omar.html': ['IMG-20260826-WA0025.jpg', 'IMG-20260826-WA0035.jpg', 'IMG-20260826-WA0037.jpg', 'IMG-20260826-WA0038.jpg'],
  'tui.html': ['IMG-20260826-WA0027.jpg', 'IMG-20260826-WA0029.jpg', 'IMG-20260826-WA0032.jpg'],
  'danger-bou.html': ['IMG-20260826-WA0030.jpg', 'IMG-20260826-WA0028.jpg']
};

const groupLabels = {
  'omar.html': 'OMAR',
  'tui.html': 'Tui',
  'danger-bou.html': 'Danger Bou'
};

const detailPage = window.location.pathname.split('/').pop();
const detailVideo = detailMain?.querySelector('.video-section');
const detailPoster = detailMain?.querySelector('.detail-poster');
if (detailMain && detailVideo && detailPoster && posterGroups[detailPage]) {
  const posterList = posterGroups[detailPage];
  detailPoster.innerHTML = '<div class="detail-gallery-window"><div class="detail-gallery"></div></div><div class="gallery-controls"><button type="button" data-gallery-prev aria-label="Previous poster">←</button><span class="gallery-current">01 / 00</span><button type="button" data-gallery-next aria-label="Next poster">→</button></div>';
  const detailGallery = detailPoster.querySelector('.detail-gallery');
  detailGallery.innerHTML = posterList.map((fileName, index) => `<figure class="gallery-slide"><img src="images/${fileName}" alt="${groupLabels[detailPage]} poster ${index + 1}"><figcaption>${String(index + 1).padStart(2, '0')} / ${String(posterList.length).padStart(2, '0')}</figcaption></figure>`).join('');
  const galleryCurrent = detailPoster.querySelector('.gallery-current');
  const slides = [...detailGallery.querySelectorAll('.gallery-slide')];
  let galleryIndex = 0;
  const showGallerySlide = (nextIndex) => {
    galleryIndex = (nextIndex + slides.length) % slides.length;
    detailGallery.style.transform = `translateX(-${galleryIndex * 100}%)`;
    const activeImage = slides[galleryIndex].querySelector('img');
    const galleryWindow = detailPoster.querySelector('.detail-gallery-window');
    const setGalleryRatio = () => {
      if (activeImage.naturalWidth && activeImage.naturalHeight) {
        const ratio = activeImage.naturalWidth / activeImage.naturalHeight;
        galleryWindow.style.aspectRatio = `${activeImage.naturalWidth} / ${activeImage.naturalHeight}`;
        galleryWindow.style.width = `${Math.min(520, window.innerHeight * .7 * ratio)}px`;
      }
    };
    activeImage.complete ? setGalleryRatio() : activeImage.addEventListener('load', setGalleryRatio, { once: true });
    if (galleryCurrent) galleryCurrent.textContent = `${String(galleryIndex + 1).padStart(2, '0')} / ${String(slides.length).padStart(2, '0')}`;
  };
  detailPoster.querySelector('[data-gallery-prev]')?.addEventListener('click', () => showGallerySlide(galleryIndex - 1));
  detailPoster.querySelector('[data-gallery-next]')?.addEventListener('click', () => showGallerySlide(galleryIndex + 1));
  showGallerySlide(0);
}

const archiveGrid = document.querySelector('.archive-grid');
if (archiveGrid) {
  const archivePosters = [
    ['IMG-20260826-WA0024.jpg', 'Nabik', 'Natok'],
    ['IMG-20260826-WA0026.jpg', 'Danger Bou', 'Natok'],
    ['IMG-20260826-WA0028.jpg', 'Danger Bou', 'Natok'],
    ['IMG-20260826-WA0031.jpg', 'Betar Prem', 'Natok'],
    ['IMG-20260826-WA0032.jpg', 'Tui', 'Natok'],
    ['IMG-20260826-WA0035.jpg', 'OMAR / Streaming', 'Film'],
    ['IMG-20260826-WA0037.jpg', 'OMAR / Denmark', 'Film']
  ];
  archivePosters.forEach(([fileName, title, type]) => {
    if (archiveGrid.querySelector(`img[src$="${fileName}"]`)) return;
    const card = document.createElement('a');
    card.className = 'archive-card';
    card.href = projectPages[fileName] || 'work.html';
    card.innerHTML = `<img src="images/${fileName}" alt="${title} poster"><h2>${title}</h2><p>${type} · Master Communications</p>`;
    archiveGrid.appendChild(card);
  });
}

if (window.location.pathname.endsWith('/omar.html')) {
  const videoPlaceholder = document.querySelector('.video-placeholder');
  if (videoPlaceholder) {
    videoPlaceholder.innerHTML = '<iframe width="560" height="315" src="https://www.youtube.com/embed/kHDkglPtT5A?si=aEcO_FSwW2SW_qtc" title="OMAR film video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>';
  }
}

if (window.location.pathname.endsWith('/about.html')) {
  const aboutCopy = document.querySelector('.about-copy');
  const aboutIntro = aboutCopy?.querySelector('p');
  const formatFact = aboutCopy?.querySelector('.fact:nth-child(2) strong');
  if (aboutIntro) aboutIntro.textContent = 'Master Communications is an independent Bangladeshi film studio making films and drama (natok) rooted in real people, real places, and real feeling.';
  if (formatFact) formatFact.textContent = 'Films & Drama (Natok)';
}

if (window.location.pathname.endsWith('/nabik.html')) {
  const videoPlaceholder = document.querySelector('.video-placeholder');
  if (videoPlaceholder) {
    videoPlaceholder.innerHTML = '<iframe width="560" height="315" src="https://www.youtube.com/embed/UmviAnIZLgU?si=5SlRPxYXEEreshD2" title="Nabik drama video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>';
  }
}

document.querySelectorAll('h2, h3, p').forEach((element) => {
  if (element.textContent.includes('Betal Prem')) {
    element.textContent = element.textContent.replaceAll('Betal Prem', 'Tui');
  }
});

document.querySelectorAll('.project, .archive-card').forEach((project) => {
  const image = project.querySelector('img');
  let fileName = image?.src.split('/').pop();
  const detailPage = projectPages[fileName];
  const details = posterDetails[fileName];
  if (details) {
    const title = project.querySelector('h2, h3');
    const meta = project.querySelector('p');
    if (title) title.textContent = details[0];
    if (meta && !meta.textContent.includes('A Mohammad')) meta.textContent = `${details[1]} · Master Communications`;
  }
  if (detailPage) {
    project.addEventListener('click', (event) => {
      if (event.target.closest('[data-reel]')) return;
      window.location.href = detailPage;
    });
    project.style.cursor = 'pointer';
  }
});

document.querySelectorAll('.project, .archive-card').forEach((project) => {
  const image = project.querySelector('img');
  const fileName = image?.src.split('/').pop();
  const groupEntry = Object.entries(posterGroups).find(([, files]) => files.includes(fileName));
  const isRequestedPoster = fileName === 'IMG-20260826-WA0031.jpg';
  if (groupEntry && fileName !== groupEntry[1][0] && !isRequestedPoster) project.hidden = true;
});

menuToggle.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', isOpen);
});

document.querySelectorAll('.site-nav a').forEach((link) => {
  link.addEventListener('click', () => {
    nav.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
  });
});

document.querySelectorAll('[data-reel]').forEach((button) => {
  button.addEventListener('click', () => {
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
  });
});

document.querySelector('[data-close]').addEventListener('click', closeModal);
modal.addEventListener('click', (event) => {
  if (event.target === modal) closeModal();
});
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') closeModal();
});

function closeModal() {
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden', 'true');
}

document.querySelectorAll('.filter').forEach((button) => {
  button.addEventListener('click', () => {
    document.querySelector('.filter.active').classList.remove('active');
    button.classList.add('active');
    const category = button.dataset.filter;
    document.querySelectorAll('.project').forEach((project) => {
      project.hidden = category !== 'all' && project.dataset.category !== category;
    });
  });
});

const cardDeck = document.querySelector('.card-deck');
if (cardDeck) {
  const cards = [...cardDeck.querySelectorAll('.project')];
  const previousButton = cardDeck.querySelector('.deck-prev');
  const nextButton = cardDeck.querySelector('.deck-next');
  const currentLabel = cardDeck.querySelector('.deck-current');
  const totalLabel = cardDeck.querySelector('.deck-total');
  let currentIndex = 0;

  const visibleCards = () => cards.filter((card) => !card.hidden);
  const showCard = (index) => {
    const availableCards = visibleCards();
    if (!availableCards.length) return;
    currentIndex = (index + availableCards.length) % availableCards.length;
    cards.forEach((card) => card.classList.remove('is-active'));
    const activeCard = availableCards[currentIndex];
    activeCard.classList.add('is-active');
    const activeImage = activeCard.querySelector('.project-image img');
    const projectImage = activeCard.querySelector('.project-image');
    if (activeImage && projectImage) {
      const applyImageRatio = () => {
        if (activeImage.naturalWidth && activeImage.naturalHeight) {
          const ratio = activeImage.naturalWidth / activeImage.naturalHeight;
          projectImage.style.aspectRatio = `${activeImage.naturalWidth} / ${activeImage.naturalHeight}`;
          projectImage.style.width = `${Math.min(520, window.innerHeight * .7 * ratio)}px`;
        }
      };
      activeImage.complete ? applyImageRatio() : activeImage.addEventListener('load', applyImageRatio, { once: true });
    }
    currentLabel.textContent = String(currentIndex + 1).padStart(2, '0');
    totalLabel.textContent = String(availableCards.length).padStart(2, '0');
  };

  previousButton.addEventListener('click', () => showCard(currentIndex - 1));
  nextButton.addEventListener('click', () => showCard(currentIndex + 1));
  document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft') showCard(currentIndex - 1);
    if (event.key === 'ArrowRight') showCard(currentIndex + 1);
  });
  document.querySelectorAll('.filter').forEach((button) => {
    button.addEventListener('click', () => showCard(0));
  });
  showCard(0);
}
