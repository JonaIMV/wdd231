import confetti from 'https://cdn.jsdelivr.net/npm/canvas-confetti@1.6.0/dist/confetti.module.mjs';

const SUMMARY_CONTAINER_ID = 'submission-summary';
const STORAGE_KEY = 'contactFormData';

function parseQueryParams() {
  const params = new URLSearchParams(location.search);
  if (!params.toString()) return null;
  const data = {};
  for (const [k, v] of params.entries()) data[k] = v;
  return data;
}

function renderSummary(data) {
  const dl = document.getElementById(SUMMARY_CONTAINER_ID);
  if (!dl) return;

  dl.innerHTML = '';

  const pairs = [
    ['Full name', data.name],
    ['Email', data.email],
    ['Message', data.message],
    ['Property of interest', data.property || '—']
  ];

  pairs.forEach(([label, value]) => {
    const dt = document.createElement('dt');
    dt.textContent = label;
    const dd = document.createElement('dd');
    dd.textContent = value || '—';
    dl.appendChild(dt);
    dl.appendChild(dd);
  });
}

function getSubmissionData() {
  try {
    const stored = sessionStorage.getItem(STORAGE_KEY);
    if (stored) return JSON.parse(stored);
  } catch (e) {
    console.warn('Could not parse stored form data', e);
  }
  return parseQueryParams();
}

function startConfetti(duration = 4000) {
  const end = Date.now() + duration;

  (function frame() {
    confetti({
      particleCount: 3,
      startVelocity: 20,
      spread: 360,
      ticks: 60,
      origin: { x: Math.random(), y: Math.random() - 0.2 }
    });

    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  })();
}

export function initThankYouPage() {
  const data = getSubmissionData();
  if (!data) {
    const dl = document.getElementById(SUMMARY_CONTAINER_ID);
    if (dl) dl.innerHTML = '<p class="no-data">No submission data available.</p>';
    return;
  }

  renderSummary(data);

  try { sessionStorage.removeItem(STORAGE_KEY); } catch (e) {}

  const heading = document.getElementById('thank-you-heading');
  if (heading) {
    heading.focus({ preventScroll: true });
  }

  startConfetti(4200);
}
