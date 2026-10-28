// Early access sign-ups go to Formspree. Without JavaScript the form still posts normally.
(function () {
  const form = document.getElementById('early-form');
  const status = document.getElementById('early-status');
  if (!form || !window.fetch) return;
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const button = form.querySelector('button');
    button.disabled = true;
    status.className = 'early-status';
    status.textContent = 'Sending…';
    try {
      const res = await fetch(form.action, { method: 'POST', body: new FormData(form), headers: { Accept: 'application/json' } });
      if (!res.ok) throw new Error(String(res.status));
      form.hidden = true;
      status.textContent = 'You are on the list. I will email you when Lamp is ready.';
    } catch {
      status.className = 'early-status error';
      status.textContent = 'That did not go through. Check your email address and try again.';
      button.disabled = false;
    }
  });
})();
