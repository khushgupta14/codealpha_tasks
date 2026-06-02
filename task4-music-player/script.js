const audio = document.getElementById('audio');
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const progress = document.getElementById('progress');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');
const volume = document.getElementById('volume');
const playlistEl = document.getElementById('playlist');

const songs = [
    {title: "Carnaval", artist: "Alec_Koff", src: "song1.mp3" },
    {title: "Acoustic Spring Mothers Day Music", artist: "ikoliks_aj", src: "song2.mp3" },
    {title: "Dance Playful Night", artist: "AleXZavesa", src: "song3.mp3" }
];

let songIndex = 0;
let isPlaying = false;

function loadSong(song) {
    title.innerText = song.title;
    artist.innerText = song.artist;
    audio.src = song.src;
    updatePlaylistUI();
}

function playSong() {
    isPlaying = true;
    playBtn.innerText = 'Pause';
    audio.play();
}

function pauseSong() {
    isPlaying = false;
    playBtn.innerText = 'Play';
    audio.pause();
}

function nextSong() {
    songIndex++;
    if (songIndex > songs.length - 1) {
        songIndex = 0; 
    }
    loadSong(songs[songIndex]);
    playSong();
}

function prevSong() {
    songIndex--;
    if (songIndex < 0) {
        songIndex = songs.length - 1;
    }
    loadSong(songs[songIndex]);
    playSong();
}

function updateProgress(e) {
    const { duration, currentTime } = e.srcElement;

    if (duration) {
        const progressPercent = (currentTime / duration) * 100;
        progress.value = progressPercent;
    }

    let min = Math.floor(currentTime / 60);
    let sec = Math.floor(currentTime % 60);
    if (sec < 10) sec = `0${sec}`;
    currentTimeEl.innerText = `${min}:${sec}`;

    if (duration) {
        let durMin = Math.floor(duration / 60);
        let durSec = Math.floor(duration % 60);
        if (durSec < 10) durSec = `0${durSec}`;
        durationEl.innerText = `${durMin}:${durSec}`;
    }
}

function setProgress(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const duration = audio.duration;
    audio.currentTime = (clickX / width) * duration;
}

function renderPlaylist() {
    songs.forEach((song, index) => {
        const li = document.createElement('li');
        li.innerText = `${song.title} - ${song.artist}`;
        li.addEventListener('click', () => {
            songIndex = index;
            loadSong(songs[songIndex]);
            playSong();
        });
        playlistEl.appendChild(li);
    });
}

function updatePlaylistUI() {
    const items = playlistEl.querySelectorAll('li');
    items.forEach((item, index) => {
        if (index === songIndex) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });
}

playBtn.addEventListener('click', () => isPlaying ? pauseSong() : playSong());
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);
audio.addEventListener('timeupdate', updateProgress);
progress.addEventListener('click', setProgress);
volume.addEventListener('input', (e) => audio.volume = e.target.value);
audio.addEventListener('ended', nextSong); 

renderPlaylist();
loadSong(songs[songIndex]);