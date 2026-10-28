// Early access: paste a form link (Tally, Google Forms, Formspree...) to turn the button on.
// Until then the page says early access is opening soon.
const EARLY_ACCESS_URL = '';

(function () {
  const box = document.getElementById('early-action');
  if (!box) return;
  if (EARLY_ACCESS_URL) {
    const a = document.createElement('a');
    a.className = 'btn btn-brass';
    a.href = EARLY_ACCESS_URL;
    a.target = '_blank';
    a.rel = 'noopener';
    a.textContent = 'Request early access';
    a.style.marginTop = '28px';
    box.appendChild(a);
  } else {
    const s = document.createElement('span');
    s.className = 'early-soon';
    s.textContent = 'The early access list opens very soon';
    box.appendChild(s);
  }
})();
