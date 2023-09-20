const player = document.getElementById("player");
const displayImg = document.getElementById("display-image");
const backImg = document.getElementById("background-image");

const nameArtist = document.getElementById("name-artist");
const nameSong = document.getElementById("name-song");

const btnPlay = document.getElementById("btn-play-pause");
const btnNext = document.getElementById("btn-next-song");
const btnPrev = document.getElementById("btn-previous-song");
const btnMute = document.getElementById("btn-mute");
const btnSave = document.getElementById("btn-save");

const volumeLine = document.getElementById("volume");

const timeLine = document.getElementById("timeline");
const timeSong = document.getElementById("song-time");
const timeDuration = document.getElementById("song-duration");

const song = [["amsterdam", "Super Monkey", "Amsterdam"], ["another-bric", "Pink Floyd", "Another Brick In The Wall"], ["california-dreamin", "The Mamas & the Papas", "California Dreamin"]];

btnPlay.addEventListener("click", () => {
  if (player.paused) {
    player.play();
    player.loop = true;
  } else {
    player.pause();
  }
});
