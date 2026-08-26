const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.site-nav');
const modal = document.querySelector('.modal');

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

const projectPages = {
  'IMG-20260826-WA0025.jpg': 'omar.html',
  'IMG-20260826-WA0023.jpg': 'featured-natok.html',
  'IMG-20260826-WA0024.jpg': 'nabik.html',
  'IMG-20260826-WA0027.jpg': 'boro-bhai.html',
  'IMG-20260826-WA0026.jpg': 'original-natok.html',
  'IMG-20260826-WA0028.jpg': 'danger-bou.html',
  'IMG-20260826-WA0030.jpg': 'danger-bou.html',
  'IMG-20260826-WA0038.jpg': 'omar.html'
};

const posterDetails = {
  'IMG-20260826-WA0023.jpg': ['Bouyer Choto Chele', 'Natok'],
  'IMG-20260826-WA0024.jpg': ['Nabik', 'Natok'],
  'IMG-20260826-WA0026.jpg': ['Bhuter Bou', 'Natok'],
  'IMG-20260826-WA0027.jpg': ['Boro Bhai', 'Natok'],
  'IMG-20260826-WA0028.jpg': ['Danger Bou', 'Natok'],
  'IMG-20260826-WA0029.jpg': ['Boro Bhai', 'Natok'],
  'IMG-20260826-WA0030.jpg': ['Boro Bhai', 'Natok'],
  'IMG-20260826-WA0031.jpg': ['Boro Bhai', 'Natok'],
  'IMG-20260826-WA0032.jpg': ['Boro Bhai', 'Natok'],
  'IMG-20260826-WA0035.jpg': ['OMAR / Streaming', 'Film'],
  'IMG-20260826-WA0037.jpg': ['OMAR / Denmark', 'Film']
};

const archiveGrid = document.querySelector('.archive-grid');
if (archiveGrid) {
  const archivePosters = [
    ['IMG-20260826-WA0026.jpg', 'Bhuter Bou', 'Natok'],
    ['IMG-20260826-WA0031.jpg', 'Boro Bhai', 'Natok'],
    ['IMG-20260826-WA0032.jpg', 'Boro Bhai', 'Natok'],
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

document.querySelectorAll('h2, h3, p').forEach((element) => {
  if (element.textContent.includes('Betal Prem')) {
    element.textContent = element.textContent.replaceAll('Betal Prem', 'Boro Bhai');
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
