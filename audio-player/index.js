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

let track = 0;

const song = [["amsterdam", "Super Monkey", "Amsterdam"], ["another-bric", "Pink Floyd", "Another Brick In The Wall"], ["california-dreamin", "The Mamas & the Papas", "California Dreamin"]];

function changeTrack(track) {
  displayImg.src = "assets/img/" + song[track][0] + ".jpg";
  backImg.src = "assets/img/" + song[track][0] + ".jpg";
  player.src = "assets/audio/" + song[track][0] + ".mp3";
  nameArtist.textContent = song[track][1];
  nameSong.textContent = song[track][2];
}

btnNext.addEventListener("click", () => {
  track++;
  if (track > 2) track = 0;
  changeTrack(track);
});

btnPrev.addEventListener("click", () => {
  track--;
  if (track < 0) track = 2;
  changeTrack(track);
});

btnPlay.addEventListener("click", () => {
  if (player.paused) {
    player.play();
    player.loop = true;
  } else {
    player.pause();
  }
});
