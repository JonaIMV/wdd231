document.addEventListener("DOMContentLoaded", function () {
    const yearSpan = document.getElementById("year");
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    const lastModSpan = document.getElementById("lastModified");
    if (lastModSpan) {
        const lastModifiedDate = new Date(document.lastModified);
        const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
        lastModSpan.textContent = 'Last Modified: ' + lastModifiedDate.toLocaleString(undefined, options);
    }
});
