

export function initMenuToggle() {
  const toggleButton = document.getElementById("menu-toggle");
  const navMenu = document.getElementById("nav-menu");

  if (!toggleButton || !navMenu) return;

  toggleButton.addEventListener("click", function () {
    const isOpen = navMenu.classList.toggle("show");
    toggleButton.setAttribute("aria-expanded", isOpen);
  });
}
