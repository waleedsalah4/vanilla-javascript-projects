const musicContainer = document.getElementById('music-container');
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');

const audio = document.getElementById('audio');
const progress = document.getElementById('progress');
const progressContainer = document.getElementById('progress-conrainer');
const title = document.getElementById('title');
const cover = document.getElementById('cover');
const time = document.querySelector('.time')


//song tiltes
const songs = ['hey', 'summer', 'ukulele'];

//keep track of song
let songIndex = 2

//Initially load song details into DOM
loadSong(songs[songIndex])

//Update songs details
function loadSong(song) {
    title.innerHTML = song;
    audio.src = `music/${song}.mp3`;
    cover.src = `images/${song}.jpg`
}

// play song 
function playSong() {
    musicContainer.classList.add('play');
    playBtn.querySelector('i.fas').classList.remove('fa-play');
    playBtn.querySelector('i.fas').classList.add('fa-pause');

    audio.play()
}

//stop song 
function pauseSong(){
    musicContainer.classList.remove('play');
    playBtn.querySelector('i.fas').classList.add('fa-play');
    playBtn.querySelector('i.fas').classList.remove('fa-pause');

    audio.pause()
}


//Pervios song
function prevSong() {
    songIndex--;

    if(songIndex < 0) {
        songIndex = songs.length -1;
    }

    loadSong(songs[songIndex]);

    playSong()
}

//Next song
function nextSong(){
  songIndex++;

    if(songIndex > songs.length - 1) {
        songIndex = 0
    }

    loadSong(songs[songIndex]);
    
    playSong()
}


//Update progree bar
function updateProgress(e){
    const {duration, currentTime} = e.srcElement;
    const progressPercent = (currentTime /duration) *100;
    progress.style.width = `${progressPercent}%`;
}

//set progress bar
function setProgress(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const duration = audio.duration;

    audio.currentTime = (clickX / width) * duration;
}

//Update time 
function updateTime() {
    let minutes = Math.floor(audio.currentTime / 60);
    let seconds = Math.floor(audio.currentTime - minutes * 60);
    let minuteValue;
    let secondValue;
  
    if (minutes < 10) {
      minuteValue = '0' + minutes;
    } else {
      minuteValue = minutes;
    }
  
    if (seconds < 10) {
      secondValue = '0' + seconds;
    } else {
      secondValue = seconds;
    }
    let mediaTime = minuteValue + ':' + secondValue;
    time.textContent = mediaTime;
}

// Eevnt listeners
playBtn.addEventListener('click', ()=> {
    const isPlaying = musicContainer.classList.contains('play');
    
    if(isPlaying) {
        pauseSong();
    } else {
        playSong();
    }
})

//change song 
prevBtn.addEventListener('click', prevSong)
nextBtn.addEventListener('click', nextSong)

// Time/song Update
audio.addEventListener('timeupdate', updateProgress)
audio.addEventListener('timeupdate', updateTime)


//click on progress bar
progressContainer.addEventListener('click', setProgress)

// song ends
audio.addEventListener('ended', nextSong)