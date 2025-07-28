

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

   
    const form = document.getElementById("join-form");
    if (form) {
        form.addEventListener("submit", () => {
            localStorage.setItem("firstName", document.getElementById("firstName").value);
            localStorage.setItem("lastName", document.getElementById("lastName").value);
            localStorage.setItem("email", document.getElementById("email").value);
            localStorage.setItem("phone", document.getElementById("phone").value);
            localStorage.setItem("business", document.getElementById("business").value);
            localStorage.setItem("timestamp", document.getElementById("timestamp").value);
        });
    }
}

export function initThankYouPage() {
    const firstName = localStorage.getItem("firstName") || "";
    const lastName = localStorage.getItem("lastName") || "";
    const email = localStorage.getItem("email") || "";
    const phone = localStorage.getItem("phone") || "";
    const business = localStorage.getItem("business") || "";
    const timestamp = localStorage.getItem("timestamp") || "";

    document.getElementById("thank-first-name").textContent = firstName;
    document.getElementById("thank-last-name").textContent = lastName;
    document.getElementById("thank-email").textContent = email;
    document.getElementById("thank-phone").textContent = phone;
    document.getElementById("thank-business").textContent = business;
    document.getElementById("thank-timestamp").textContent = new Date(timestamp).toLocaleString();
}
