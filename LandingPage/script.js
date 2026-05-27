const menuButton = document.getElementById('menuButton');
const mainNav = document.getElementById('mainNav');

menuButton.addEventListener('click', () => {
  const isOpen = mainNav.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(isOpen));
});

mainNav.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    mainNav.classList.remove('open');
    menuButton.setAttribute('aria-expanded', 'false');
  });
});

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.09 });

document.querySelectorAll('.reveal').forEach((element) => revealObserver.observe(element));

const sections = [...document.querySelectorAll('main section[id]')];
const navLinks = [...mainNav.querySelectorAll('a[href^="#"]')];
const activeObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      navLinks.forEach((link) => {
        link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`);
      });
    }
  });
}, { rootMargin: '-40% 0px -52% 0px', threshold: 0 });
sections.forEach((section) => activeObserver.observe(section));

const demoImage = document.getElementById('demoImage');
const demoCaption = document.getElementById('demoCaption');
const demoTabs = [...document.querySelectorAll('.demo-tab')];
demoTabs.forEach((tab) => {
  tab.addEventListener('click', () => {
    demoTabs.forEach((item) => {
      item.classList.remove('active');
      item.setAttribute('aria-selected', 'false');
    });
    tab.classList.add('active');
    tab.setAttribute('aria-selected', 'true');
    demoImage.style.opacity = '0';
    window.setTimeout(() => {
      demoImage.src = tab.dataset.screen;
      demoCaption.textContent = tab.dataset.caption;
      demoImage.style.opacity = '1';
    }, 160);
  });
});

const modal = document.getElementById('imageModal');
const modalImage = document.getElementById('modalImage');
const modalTitle = document.getElementById('modalTitle');
document.querySelectorAll('.gallery-card').forEach((card) => {
  card.addEventListener('click', () => {
    modalImage.src = card.dataset.image;
    modalTitle.textContent = card.dataset.title;
    modal.showModal();
  });
});
document.getElementById('closeModal').addEventListener('click', () => modal.close());
modal.addEventListener('click', (event) => {
  const bounds = modal.getBoundingClientRect();
  const outside = event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom;
  if (outside) modal.close();
});

const currentUrl = window.location.href.split('#')[0];
const qrCode = document.getElementById('qrCode');
qrCode.src = `https://api.qrserver.com/v1/create-qr-code/?size=220x220&margin=0&data=${encodeURIComponent(currentUrl)}`;

document.getElementById('copyLink').addEventListener('click', async (event) => {
  try {
    await navigator.clipboard.writeText(currentUrl);
    event.currentTarget.textContent = 'Link copiado!';
    window.setTimeout(() => { event.currentTarget.textContent = 'Copiar link da página'; }, 1800);
  } catch (error) {
    event.currentTarget.textContent = 'Copie o endereço do navegador';
  }
});
