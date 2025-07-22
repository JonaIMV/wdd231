export function highlightCurrentPage() {
  const currentPage = location.pathname.split("/").pop();
  const navLinks = document.querySelectorAll(".nav-links a");

  navLinks.forEach(link => {
    const href = link.getAttribute("href");
    if (href === currentPage || (currentPage === "" && href === "index.html")) {
      link.classList.add("active");
      link.setAttribute("aria-current", "page");
    }
  });
}


export function setHamburgerMenu() {
  const menuToggle = document.getElementById('menu-toggle');
  const navMenu = document.getElementById('nav-menu');

  if (!menuToggle || !navMenu) {
    console.error("Menu toggle or navigation menu not found.");
    return;
  }

  menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('hidden');
    menuToggle.setAttribute(
      'aria-expanded',
      !navMenu.classList.contains('hidden'));
  });
}
