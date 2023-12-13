document.addEventListener("DOMContentLoaded", function () {
  // Check if user is already logged in
  if (localStorage.getItem("isLoggedIn") === "true") {
    window.location.replace("Webpage.html");
  }
});
function registerUser() {
  var regUsername = document.getElementById("regUsername").value;
  var regPassword = document.getElementById("regPassword").value;

  // Check if username is already registered
  if (localStorage.getItem(regUsername)) {
    alert("Username already registered");
    return;
  }

  // Simpler hashing (for demonstration purposes only)
  var hashedPassword = hashPassword(regPassword);

  // Store user information securely
  localStorage.setItem(regUsername, hashedPassword);
  displayError("");
  clearRegistrationForm();
}

function loginUser() {
  var loginUsername = document.getElementById("loginUsername").value;
  var loginPassword = document.getElementById("loginPassword").value;

  // Check if username exists
  if (!localStorage.getItem(loginUsername)) {
    alert("Invalid username or password");
    return;
  }

  // Simpler password verification (for demonstration purposes only)
  var storedPasswordHash = localStorage.getItem(loginUsername);
  var enteredPasswordHash = hashPassword(loginPassword);

  if (enteredPasswordHash === storedPasswordHash) {
    // Login successful
    localStorage.setItem("isLoggedIn", "true");
    alert("User logged in!");
    window.location.replace("Webpage.html");
    displayError("");
  } else {
    // Invalid password
    alert("Invalid username or password");
  }
}

function hashPassword(password) {
  // Replace this with a more secure hashing function in a production environment
  return password;
}

function showSecuredPage() {
  document.getElementById("registrationForm").style.display = "none";
  document.getElementById("loginForm").style.display = "none";
  document.getElementById("securedPage").style.display = "block";
}

function displayError(message) {
  document.getElementById("error-message").innerText = message;
}

function clearRegistrationForm() {
  document.getElementById("regUsername").value = "";
  document.getElementById("regPassword").value = "";
}
