
export function setupViewToggle(containerId) {
  const container = document.getElementById(containerId);
  const gridView = document.getElementById("gridView");
  const listView = document.getElementById("listView");

  if (!container || !gridView || !listView) return;

  gridView.addEventListener("click", () => {
    container.classList.add("grid");
    container.classList.remove("list");
  });

  listView.addEventListener("click", () => {
    container.classList.add("list");
    container.classList.remove("grid");
  });
}
