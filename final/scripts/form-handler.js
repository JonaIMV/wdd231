export function initContactForm() {
    const form = document.querySelector(".contact-form");

    if (form) {
        form.addEventListener("submit", (event) => {
            event.preventDefault();

            const formData = new FormData(form);
            const data = {};
            formData.forEach((value, key) => data[key] = value);
            sessionStorage.setItem("contactFormData", JSON.stringify(data));
            window.location.href = "thankyou.html";
        });
    }
}
