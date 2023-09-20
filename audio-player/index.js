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
let trackVolume = 1;

const song = [["amsterdam", "Super Monkey", "Amsterdam"], ["another-bric", "Pink Floyd", "Another Brick In The Wall"], ["california-dreamin", "The Mamas & the Papas", "California Dreamin"]];

function download(url) {
  fetch(url)
  .then(resp => resp.status === 200 ? resp.blob() : Promise.reject('Something went wrong'))
  .then(blob => {
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.style.display = 'none';
    a.href = url;
    a.download = 'song.mp3';
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    console.log("File has downloaded!"); 
  })
  .catch(() => console.log("Sorry, not downloaded!"));
};

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

btnSave.addEventListener("click", () => {
  download(player.src);
});

btnMute.addEventListener("click", () => {
  if (player.volume != 0) player.volume = 0;
  else player.volume = trackVolume;
});
