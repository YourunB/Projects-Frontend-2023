console.log(`Оценка: 70 / 60\n1. Вёрстка +10\nвёрстка аудиоплеера: есть кнопка Play/Pause, кнопки "Вперёд" и "Назад" для пролистывания аудиотреков, прогресс-бар, отображается название и автор трека +5\nв футере приложения есть ссылка на гитхаб автора приложения, год создания приложения, логотип курса со ссылкой на курс +5\n2. Кнопка Play/Pause +10\nесть кнопка Play/Pause, при клике по которой можно запустить или остановить проигрывание аудиотрека +5\nвнешний вид и функционал кнопки Play/Pause изменяется в зависимости от того, проигрывается ли в данный момент аудиотрек +5\n3. При кликах по кнопкам "Вперёд" и "Назад" переключается проигрываемый аудиотрек. Аудиотреки пролистываются по кругу - после последнего идёт первый +10\n4. При смене аудиотрека меняется изображение - обложка аудиотрека +10\n5. Прогресс-бар отображает прогресс проигрывания текущего аудиотрека. При перемещении ползунка вручную меняется текущее время проигрывания аудиотрека +10\n6. Отображается продолжительность аудиотрека и его текущее время проигрывания +10\n7. Очень высокое качество оформления приложения и/или дополнительный не предусмотренный в задании функционал, улучшающий качество приложения +10\nвысокое качество оформления приложения предполагает собственное оригинальное оформление равное или отличающееся в лучшую сторону по сравнению с демо (приложение улучшено, добавлена анимация, добавлено управление звуком, добавлена возможность скачивать песню)`)

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

function checkPlay() {
  if (player.paused) btnPlay.classList.remove("player__controls_main_pause");
  else btnPlay.classList.add("player__controls_main_pause");
}

function checkVolume() {
  if (player.volume > 0.01) btnMute.classList.add("player__controls_mute_off");
  else btnMute.classList.remove("player__controls_mute_off");
}

function formatTime(seconds) {
  //const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  if (isNaN(m) || isNaN(s)) return "LOAD";
  return m + ":" + ((s < 10) ? "0" + s.toFixed(0) : s.toFixed(0));
}

function timePosition() {
  timeLine.min = 0;
  timeLine.max = player.duration;
  timeLine.value = player.currentTime;
  timeSong.textContent = formatTime(player.currentTime);
  timeDuration.textContent = formatTime(player.duration);
}

setInterval(() => {
  timePosition();
}, 1000);

timeLine.addEventListener("input", () => {
  player.currentTime = timeLine.value;
  timePosition();
});

volumeLine.addEventListener("input", () => {
  trackVolume = volumeLine.value / 100;
  player.volume = trackVolume;
  checkVolume();
});

btnSave.addEventListener("click", () => {
  download(player.src);
});

btnNext.addEventListener("click", () => {
  track++;
  if (track > 2) track = 0;
  if (player.paused) changeTrack(track);
  else {
    changeTrack(track);
    player.play();
    player.loop = true;
  }
  checkPlay();
  setTimeout(() => timePosition, 250);
});

btnPrev.addEventListener("click", () => {
  track--;
  if (track < 0) track = 2;
  if (player.paused) changeTrack(track);
  else {
    changeTrack(track);
    player.play();
    player.loop = true;
  }
  checkPlay();
  setTimeout(() => timePosition, 250);
});

btnPlay.addEventListener("click", () => {
  if (player.paused) {
    player.play();
    player.loop = true;
  } else {
    player.pause();
  }
  checkPlay();
});

btnMute.addEventListener("click", () => {
  if (player.volume != 0) player.volume = 0;
  else player.volume = trackVolume;
  checkVolume();
});
