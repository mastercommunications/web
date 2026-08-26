const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.site-nav');
const modal = document.querySelector('.modal');

const projectPages = {
  'IMG-20260826-WA0025.jpg': 'omar.html',
  'IMG-20260826-WA0023.jpg': 'featured-natok.html',
  'IMG-20260826-WA0027.jpg': 'boro-bhai.html',
  'IMG-20260826-WA0026.jpg': 'original-natok.html',
  'IMG-20260826-WA0028.jpg': 'danger-bou.html',
  'IMG-20260826-WA0030.jpg': 'omar.html',
  'IMG-20260826-WA0038.jpg': 'omar.html'
};

if (window.location.pathname.endsWith('/omar.html')) {
  const videoPlaceholder = document.querySelector('.video-placeholder');
  if (videoPlaceholder) {
    videoPlaceholder.innerHTML = '<iframe width="560" height="315" src="https://www.youtube.com/embed/kHDkglPtT5A?si=aEcO_FSwW2SW_qtc" title="OMAR film video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>';
  }
}

document.querySelectorAll('.project, .archive-card').forEach((project) => {
  const image = project.querySelector('img');
  const fileName = image?.src.split('/').pop();
  const detailPage = projectPages[fileName];
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
