export function initJoinPage() {
  
  const timestamp = document.getElementById("timestamp");
  if (timestamp) {
    timestamp.value = new Date().toISOString();
  }

  
  document.querySelectorAll('.membership-cards a').forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const modalId = link.getAttribute('href').substring(1);
      const modal = document.getElementById(modalId);
      if (modal) modal.showModal();
    });
  });

  
  document.querySelectorAll('dialog button.close').forEach(btn => {
    btn.addEventListener('click', e => {
      const dialog = btn.closest('dialog');
      if (dialog) dialog.close();
    });
  });

  
  const cards = document.querySelectorAll('.membership-cards .card');
  cards.forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.animation = `fadeUp 1s ease-out forwards`;
    card.style.animationDelay = `${index * 0.2}s`;
  });
}
