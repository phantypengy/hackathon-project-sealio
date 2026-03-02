let grid = document.querySelector(".videoGrid");
let videos = Array.from(grid.children);
//selecting the grid and making an array of its children (the video divs)

document.addEventListener("DOMContentLoaded", () => {
  function shuffle(array) {
    for (var i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  } //randomizes the order of the array!!

  shuffle(videos); //calls the shuffle function on the videos array
  videos.forEach((video) => grid.appendChild(video));
});

const playerVideo = document.getElementById("playerVideo");
const playerModal = document.getElementById("playerModal");
const closePlayer = document.getElementById("closePlayer");

document.querySelectorAll(".video").forEach((video) => {
  video.addEventListener("click", () => {
    const src = video.dataset.src;
    playerVideo.src = src;
    playerModal.style.display = "flex";
    playerVideo.play();
  });
});

function closeVideo() {
  playerModal.style.display = "none";
  playerVideo.pause();
  playerVideo.src = "";
}

function searchItems() {}
