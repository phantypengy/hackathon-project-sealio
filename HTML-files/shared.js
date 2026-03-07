async function logout() {
  await fetch("http://localhost:3000/logout", {
    method: "POST",
    credentials: "include",
  });
  window.location.href = "login.html";
  alert("Succesfully logged out!");
}

async function loadUser() {
  try {
    const response = await fetch("http://localhost:3000/me", {
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
