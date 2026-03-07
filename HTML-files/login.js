function switchTab(tab) {
  document.getElementById("loginForm").style.display =
    tab === "login" ? "block" : "none";
  document.getElementById("signupForm").style.display =
    tab === "signup" ? "block" : "none";

  document
    .querySelectorAll(".loginTab")
    .forEach((t) => t.classList.remove("active"));
  event.target.classList.add("active");
}

async function login() {
  const username = document.getElementById("loginUsername").value;
  const password = document.getElementById("loginPassword").value;

  const response = await fetch("/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ username, password }),
  });

  const data = await response.json();
  if (response.ok) {
    window.location.href = "redesign.html";
  } else {
    document.getElementById("loginError").textContent = data.error;
  }
}

async function signup() {
  const username = document.getElementById("signupUsername").value;
  const password = document.getElementById("signupPassword").value;
  const confirm = document.getElementById("signupConfirm").value;

  if (password !== confirm) {
    document.getElementById("signupError").textContent =
      "Passwords do not match!";
    return;
  }

  const response = await fetch("/signup", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ username, password }),
  });

  const data = await response.json();
  if (response.ok) {
    window.location.href = "redesign.html";
  } else {
    document.getElementById("signupError").textContent = data.error;
  }
}
