const menuButton = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

if (menuButton && navLinks) {
  menuButton.addEventListener('click', () => {
    const open = navLinks.classList.toggle('open');
    menuButton.setAttribute('aria-expanded', String(open));
    menuButton.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
  });

  navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    navLinks.classList.remove('open');
    menuButton.setAttribute('aria-expanded', 'false');
  }));
}

document.querySelectorAll('.year').forEach(el => el.textContent = new Date().getFullYear());

const reveals = document.querySelectorAll('.reveal');

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries, obs) => entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      obs.unobserve(e.target);
    }
  }), { threshold: .12 });

  reveals.forEach(el => observer.observe(el));
} else {
  reveals.forEach(el => el.classList.add('visible'));
}

const form = document.getElementById('contactForm');

if (form) {
  form.addEventListener('submit', e => {
    e.preventDefault();

    if (!form.reportValidity()) return;

    const d = new FormData(form);
    const subject = encodeURIComponent('BM DIGITALS enquiry: ' + d.get('service'));
    const body = encodeURIComponent(
      `Name: ${d.get('name')}\n` +
      `Email: ${d.get('email')}\n` +
      `Company: ${d.get('company') || 'Not provided'}\n` +
      `Service: ${d.get('service')}\n\n` +
      `Project details:\n${d.get('message')}`
    );

    const msg = document.getElementById('formMessage');
    if (msg) msg.textContent = 'Your email application should open with the enquiry prepared. Please review and send it.';

    window.location.href = `mailto:mkhantsho5@gmail.com?subject=${subject}&body=${body}`;
  });
}