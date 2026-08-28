// Aili Alamdari — portfolio interactions

document.addEventListener('DOMContentLoaded', () => {

  /* Mobile nav */
  const burger = document.querySelector('.navburger');
  const nav = document.querySelector('.mainnav');
  if (burger && nav) {
    burger.addEventListener('click', () => {
      const isOpen = nav.classList.toggle('open-mobile');
      nav.style.display = isOpen ? 'flex' : '';
      if (isOpen) {
        nav.style.position = 'absolute';
        nav.style.top = '68px';
        nav.style.left = '0';
        nav.style.right = '0';
        nav.style.flexDirection = 'column';
        nav.style.background = 'var(--bg)';
        nav.style.padding = '18px 28px';
        nav.style.borderBottom = '1px solid var(--line)';
        nav.style.gap = '18px';
      }
    });
    nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
      nav.classList.remove('open-mobile');
      nav.removeAttribute('style');
    }));
  }

  /* Experience accordion */
  document.querySelectorAll('.parts-row[data-toggle]').forEach(row => {
    row.addEventListener('click', () => {
      const detail = row.nextElementSibling;
      const isOpen = row.classList.contains('open');
      document.querySelectorAll('.parts-row.open').forEach(r => {
        r.classList.remove('open');
        r.nextElementSibling.style.maxHeight = null;
      });
      if (!isOpen) {
        row.classList.add('open');
        detail.style.maxHeight = detail.scrollHeight + 40 + 'px';
      }
    });
  });

  /* Lightbox for gallery images */
  const lightbox = document.getElementById('lightbox');
  if (lightbox) {
    const lbImg = lightbox.querySelector('img');
    document.querySelectorAll('.gallery img').forEach(img => {
      img.addEventListener('click', () => {
        lbImg.src = img.getAttribute('src');
        lbImg.alt = img.alt;
        lightbox.classList.add('open');
      });
    });
    lightbox.addEventListener('click', () => lightbox.classList.remove('open'));
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape') lightbox.classList.remove('open');
    });
  }

  /* Reveal on scroll */
  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && revealEls.length) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('in');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.12 });
    revealEls.forEach(el => io.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add('in'));
  }

  /* Animate bar charts once visible */
  const barGroups = document.querySelectorAll('.bars');
  if ('IntersectionObserver' in window && barGroups.length) {
    const bio = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.querySelectorAll('.bar').forEach(bar => {
            bar.style.height = bar.getAttribute('data-h') + '%';
          });
          bio.unobserve(e.target);
        }
      });
    }, { threshold: 0.3 });
    barGroups.forEach(g => bio.observe(g));
  } else {
    barGroups.forEach(g => g.querySelectorAll('.bar').forEach(bar => {
      bar.style.height = bar.getAttribute('data-h') + '%';
    }));
  }

  /* Active nav link highlight */
  const path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.navlink').forEach(a => {
    const href = a.getAttribute('href').split('/').pop();
    if (href === path || (path === '' && href === 'index.html')) {
      a.classList.add('active');
    }
  });

});
