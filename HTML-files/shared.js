async function logout() {
  await fetch("/logout", {
    method: "POST",
    credentials: "include",
  });
  window.location.href = "login.html";
  alert("Succesfully logged out!");
}

async function loadUser() {
  try {
    const response = await fetch("/me", {
      credentials: "include",
    });
    if (response.ok) {
      const user = await response.json();
      document.getElementById("navUsername").textContent = user.username;
    } else {
      document.getElementById("navUsername").textContent = "Not logged in";
    }
  } catch (err) {
    console.log("Could not load user:", err);
  }
}

loadUser();
