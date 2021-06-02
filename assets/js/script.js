'use strict';

const musicContainer = document.querySelector('.music-container');
const playBtn = document.querySelector('#play');
const prevBtn = document.querySelector('#prev');
const nextBtn = document.querySelector('#next');
const progress = document.querySelector('.progress');
const progressContainer = document.querySelector('.progress-container');
const title = document.querySelector('#title');
const cover = document.querySelector('#cover');
const audio = document.querySelector('#audio');
const container = document.querySelector('.container');
const volumeSlider = document.querySelector('.volume_slider');
const volumeup = document.querySelector('#volumeUp');
const volumeDown = document.querySelector('#volumeDown');

const songs = [
  'i like me better',
  'if the world was ending',
  'sunflower',
  'wildflower',
];

let songIndex = 1;

const loadSong = song => {
  title.innerText = song
    .toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
  audio.src = `assets/music/${song}.mp3`;
  cover.src = `assets/img/${song}.jpg`;
  container.style.backgroundImage = `linear-gradient(
    rgba(255, 255, 255, 0.836),
    rgba(255, 255, 255, 0.842)
  ),url(assets/img/${song.replace(/\s/g, '\\$&')}.jpg)`;
};

const playSong = () => {
  musicContainer.classList.add('play');
  playBtn.querySelector('i.fas').classList.remove('fa-play');
  playBtn.querySelector('i.fas').classList.add('fa-pause');

  audio.play();
};

const pauseSong = () => {
  musicContainer.classList.remove('play');
  playBtn.querySelector('i.fas').classList.add('fa-play');
  playBtn.querySelector('i.fas').classList.remove('fa-pause');

  audio.pause();
};

const prevSong = () => {
  songIndex--;
  if (songIndex < 0) {
    songIndex = songs.length - 1;
  }
  loadSong(songs[songIndex]);
  playSong();
};

const nextSong = () => {
  songIndex++;
  if (songIndex > songs.length - 1) {
    songIndex = 0;
  }
  loadSong(songs[songIndex]);
  playSong();
};

const updateProgress = e => {
  const { currentTime, duration } = e.srcElement;

  const progressPercent = (currentTime / duration) * 100;
  progress.style.width = `${progressPercent}%`;
};

const reduceVolume = () => {
  audio.volume = 0;
  volumeSlider.value = 0;
};

const incVolume = () => {
  audio.volume = 1;
  volumeSlider.value = 100;
};

function setProgress(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const duration = audio.duration;

  audio.currentTime = (clickX / width) * duration;
}

function setVolume() {
  audio.volume = volumeSlider.value / 100;
}

playBtn.addEventListener('click', () => {
  const isPlaying = musicContainer.classList.contains('play');

  if (isPlaying) {
    pauseSong();
  } else {
    playSong();
  }
});

prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);
audio.addEventListener('timeupdate', updateProgress);
progressContainer.addEventListener('click', setProgress);
volumeSlider.addEventListener('change', setVolume);
volumeDown.addEventListener('click', reduceVolume);
volumeUp.addEventListener('click', incVolume);

audio.addEventListener('ended', nextSong);

loadSong(songs[songIndex]);
