export function showVisitMessage(containerId) {
  const messageContainer = document.getElementById(containerId);
  if (!messageContainer) return;

  const lastVisit = localStorage.getItem("lastVisit");
  const now = Date.now();

  let message = "";

  if (!lastVisit) {
    message = "Welcome! Let us know if you have any questions.";
  } else {
    const previous = Number(lastVisit);
    const diffTime = now - previous;
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 1) {
      message = "Back so soon! Awesome!";
    } else if (diffDays === 1) {
      message = "You last visited 1 day ago.";
    } else {
      message = `You last visited ${diffDays} days ago.`;
    }
  }

  // Update the DOM and save the new visit time
  messageContainer.textContent = message;
  localStorage.setItem("lastVisit", now);
}
