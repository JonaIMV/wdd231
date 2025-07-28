document.addEventListener("DOMContentLoaded", () => {
  
  const firstNameField = document.getElementById("firstNameField");
  const lastNameField = document.getElementById("lastNameField");
  const emailField = document.getElementById("emailField");
  const phoneField = document.getElementById("phoneField");
  const businessField = document.getElementById("businessField");
  const timestampField = document.getElementById("timestampField");

  
  const formDataJSON = localStorage.getItem("membershipForm");

  if (formDataJSON) {
    const formData = JSON.parse(formDataJSON);

    
    firstNameField.textContent = formData.firstName || "N/A";
    lastNameField.textContent = formData.lastName || "N/A";
    emailField.textContent = formData.email || "N/A";
    phoneField.textContent = formData.phone || "N/A";
    businessField.textContent = formData.business || "N/A";
    timestampField.textContent = formData.timestamp || "N/A";
  } else {
    
    firstNameField.textContent = "No submission data found.";
  }
});
