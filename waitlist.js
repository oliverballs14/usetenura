// Tenura waitlist signup — shared by every page.
//
// SETUP: create a free form at formspree.io, then paste its endpoint below
// (looks like https://formspree.io/f/abcdwxyz). Each signup is emailed to you
// and stored in the Formspree dashboard. Until this is set, the form falls back
// to opening the visitor's email app addressed to CONTACT_EMAIL, so no signup
// is ever silently lost.
const WAITLIST_ENDPOINT = 'https://formspree.io/f/mnppawrj';
const CONTACT_EMAIL = 'hello@usetenura.com';

async function handleSignup() {
  const input = document.querySelector('.cta-row input');
  const button = document.querySelector('.cta-row button');
  const note = document.getElementById('cta-note');
  const email = (input.value || '').trim();

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
    input.style.borderColor = '#e07070';
    input.placeholder = 'Please enter a valid email';
    setTimeout(() => {
      input.style.borderColor = '';
      input.placeholder = 'Your email address';
    }, 2000);
    return;
  }

  if (!WAITLIST_ENDPOINT) {
    const subject = encodeURIComponent('Tenura waitlist');
    const body = encodeURIComponent('Please add me to the Tenura waitlist: ' + email);
    note.textContent = 'Opening your email app to send your request…';
    window.location.href = 'mailto:' + CONTACT_EMAIL + '?subject=' + subject + '&body=' + body;
    return;
  }

  button.disabled = true;
  const originalLabel = button.textContent;
  button.textContent = 'Joining…';
  try {
    const res = await fetch(WAITLIST_ENDPOINT, {
      method: 'POST',
      headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: email, page: window.location.pathname })
    });
    if (!res.ok) throw new Error('Request failed');
    input.value = '';
    note.textContent = '✓ You\'re on the list. We\'ll be in touch shortly.';
    note.style.color = '#7ee2a8';
    note.style.fontWeight = '500';
  } catch (err) {
    note.textContent = 'Something went wrong. Please email ' + CONTACT_EMAIL + ' and we\'ll add you.';
    note.style.color = '#e07070';
  } finally {
    button.disabled = false;
    button.textContent = originalLabel;
  }
}

document.addEventListener('DOMContentLoaded', function () {
  const input = document.querySelector('.cta-row input');
  if (input) {
    input.addEventListener('keydown', function (e) {
      if (e.key === 'Enter') handleSignup();
    });
  }
});
