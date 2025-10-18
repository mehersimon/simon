window.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('#contactForm');
  const status = document.querySelector('#contactStatus');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    status.textContent = 'Sending…';

    const payload = {
      name: form.name.value,
      email: form.email.value,
      message: form.message.value,
    };

    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      status.textContent = 'Thanks! We will get back to you.';
      form.reset();
    } else {
      status.textContent = 'Failed to send. Please try again.';
    }
  });
});
