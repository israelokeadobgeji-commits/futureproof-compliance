const FP = {
  phone: "+234 816 918 0353",
  phoneHref: "+2348169180353",
  whatsapp: "2348169180353",
  email: "futureproofcompliance701@gmail.com"
};

function wa(message) {
  return `https://wa.me/${FP.whatsapp}?text=${encodeURIComponent(message)}`;
}

function mail(subject, body = "") {
  return `mailto:${FP.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

function pageName() {
  const value = window.location.pathname.split('/').pop();
  return value || 'index.html';
}

function createBackground() {
  if (document.querySelector('.scene-bg')) return;
  const bg = document.createElement('div');
  bg.className = 'scene-bg';
  bg.setAttribute('aria-hidden', 'true');
  bg.innerHTML = `
    <div class="scene-glow glow-a"></div>
    <div class="scene-glow glow-b"></div>
    <div class="scene-glow glow-c"></div>
    <div class="scene-grid"></div>
    <div class="scene-beam beam-a"></div>
    <div class="scene-beam beam-b"></div>
  `;
  document.body.prepend(bg);
}

function createHeader() {
  const mount = document.getElementById('site-header');
  if (!mount) return;
  const current = pageName();
  const active = (file) => current === file ? 'active' : '';

  mount.innerHTML = `
    <header class="site-header">
      <div class="container nav-wrap">
        <a class="brand" href="index.html" aria-label="Futureproof Compliance Services home">
          <img src="assets/LOGO.jpeg" alt="Futureproof Compliance Services logo">
          <span class="brand-copy">
            <strong>FUTUREPROOF</strong>
            <small>Compliance Services</small>
          </span>
        </a>
        <button class="menu-btn" id="menuBtn" aria-label="Open navigation" aria-expanded="false">☰</button>
        <nav id="mainNav" aria-label="Main navigation">
          <a class="${active('index.html')}" href="index.html">Home</a>
          <a class="${active('services.html')}" href="services.html">Services</a>
          <a class="${active('how-it-works.html')}" href="how-it-works.html">How It Works</a>
          <a class="${active('consultations.html')}" href="consultations.html">Consultations</a>
          <a class="${active('get-help.html')}" href="get-help.html">Get Help</a>
          <a class="nav-cta ${active('assessment.html')}" href="assessment.html">Check My Business</a>
        </nav>
      </div>
    </header>`;
}

function createFooter() {
  const mount = document.getElementById('site-footer');
  if (!mount) return;
  mount.innerHTML = `
    <footer class="site-footer">
      <div class="container footer-grid">
        <div class="footer-brand-block">
          <div class="footer-brand">
            <img src="assets/LOGO.jpeg" alt="Futureproof Compliance Services logo">
            <div><strong>FUTUREPROOF</strong><span>Compliance Services</span></div>
          </div>
          <p>Register. Stay compliant. Grow.</p>
        </div>
        <div>
          <h4>Quick Links</h4>
          <div class="footer-links">
            <a href="services.html">Services</a>
            <a href="assessment.html">Compliance Assessment</a>
            <a href="consultations.html">Consultations</a>
            <a href="get-help.html">Get Help</a>
          </div>
        </div>
        <div>
          <h4>Contact</h4>
          <div class="footer-links">
            <a href="tel:${FP.phoneHref}">${FP.phone}</a>
            <a href="mailto:${FP.email}">${FP.email}</a>
            <a href="${wa('Hello FUTUREPROOF, I would like to make an enquiry.')}" target="_blank" rel="noopener">WhatsApp</a>
          </div>
        </div>
      </div>
      <div class="container footer-bottom">© ${new Date().getFullYear()} FUTUREPROOF Compliance Services.</div>
    </footer>`;
}

function setupMenu() {
  const btn = document.getElementById('menuBtn');
  const nav = document.getElementById('mainNav');
  if (!btn || !nav) return;
  btn.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    btn.setAttribute('aria-expanded', String(open));
  });
  nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => nav.classList.remove('open')));
}

function setupDynamicLinks() {
  document.querySelectorAll('[data-wa]').forEach(a => {
    a.href = wa(a.dataset.wa || 'Hello FUTUREPROOF, I would like to make an enquiry.');
    a.target = '_blank';
    a.rel = 'noopener';
  });
  document.querySelectorAll('[data-mail-subject]').forEach(a => {
    a.href = mail(a.dataset.mailSubject || 'Futureproof Enquiry', a.dataset.mailBody || '');
  });
  document.querySelectorAll('[data-phone]').forEach(a => {
    a.href = `tel:${FP.phoneHref}`;
    if (!a.textContent.trim()) a.textContent = FP.phone;
  });
}

function setupReveal() {
  const items = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window)) {
    items.forEach(el => el.classList.add('visible'));
    return;
  }
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.13 });
  items.forEach(el => observer.observe(el));
}

document.addEventListener('DOMContentLoaded', () => {
  createBackground();
  createHeader();
  createFooter();
  setupMenu();
  setupDynamicLinks();
  setupReveal();
});
