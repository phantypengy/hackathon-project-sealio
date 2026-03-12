async function loadMySeal() {
  const loginRequired = document.getElementById("loginRequired");
  const userInfo = document.getElementById("userInfo");
  const accountUsername = document.getElementById("accountUsername");
  const myVideosGrid = document.getElementById("myVideosGrid");
  const accountSubtext = document.getElementById("accountSubtext");

  loginRequired.style.display = "none";
  userInfo.style.display = "none";
  myVideosGrid.innerHTML = "";

  try {
    const meResponse = await fetch("/me", {
      credentials: "include",
    });

    if (!meResponse.ok) {
      loginRequired.style.display = "block";
      accountSubtext.textContent = "Log in to access your account";
      return;
    }

    const user = await meResponse.json();

    userInfo.style.display = "block";
    accountUsername.textContent = user.username;
    accountSubtext.textContent = "Manage your uploaded videos";

    const videosResponse = await fetch("/my-videos", {
      credentials: "include",
    });

    if (!videosResponse.ok) {
      throw new Error("Failed to load uploaded videos");
    }

    const videos = await videosResponse.json();

    if (!videos || videos.length === 0) {
      myVideosGrid.innerHTML = `
        <div class="emptyState">
          <h3>No uploaded videos yet</h3>
          <p>Your uploaded videos will appear here.</p>
        </div>
      `;
      return;
    }

    videos.forEach((video) => {
      const videoCard = document.createElement("div");
      videoCard.classList.add("video");
      videoCard.innerHTML = `
        <div class="thumbnail">
          <img src="${video.thumbnail_url}" alt="Video Thumbnail" />
        </div>
        <div class="videoInfo">
          <h4 class="videoTitle">${video.title}</h4>
          <p class="channelName">${video.username}</p>
          <button class="deleteVideoBtn" data-id="${video.id}">
            Delete Video
          </button>
        </div>
      `;

      videoCard.addEventListener("click", (event) => {
        if (event.target.classList.contains("deleteVideoBtn")) {
          return;
        }
        window.location.href = `video.html?id=${video.id}`;
      });

      myVideosGrid.appendChild(videoCard);
    });

    addDeleteListeners();
  } catch (error) {
    console.error("My Seal error:", error);
    myVideosGrid.innerHTML = `
      <div class="emptyState">
        <h3>Could not load your videos</h3>
        <p>Please try again later.</p>
      </div>
    `;
  }
}

function addDeleteListeners() {
  const deleteButtons = document.querySelectorAll(".deleteVideoBtn");

  deleteButtons.forEach((button) => {
    button.addEventListener("click", async (event) => {
      event.stopPropagation();

      const confirmed = confirm("Are you sure you want to delete this video?");
      if (!confirmed) {
        return;
      }

      const videoId = button.dataset.id;

      try {
        const response = await fetch(`/videos/${videoId}`, {
          method: "DELETE",
          credentials: "include",
        });

        const data = await response.json();

        if (response.ok) {
          loadMySeal();
        } else {
          alert(data.error || "Failed to delete video");
        }
      } catch (error) {
        console.error("Delete video error:", error);
        alert("Something went wrong while deleting the video.");
      }
    });
  });
}

loadMySeal();