const days = document.querySelector('#days');
const hours = document.querySelector('#hours');
const minutes = document.querySelector('#minutes');
const seconds = document.querySelector('#seconds');
const loading = document.querySelector('#loading');
const countdown = document.getElementById('countdown');
const year = document.getElementById('year');

const currYear = new Date().getFullYear()
const newYearTime = new Date(`January 01 ${currYear + 1} 00:00:00`);


// Set background year
year.innerText = currYear + 1;


function updateCount() {
    const currTime = new Date();
    const diff = newYearTime - currTime;

    const d = Math.floor(diff / 1000 / 60 / 60 / 24);
    const h = Math.floor(diff / 1000 / 60 / 60) % 24;
    const m = Math.floor(diff / 1000 / 60) % 60;
    const s = Math.floor(diff / 1000) % 60;

    days.innerHTML = d;
    hours.innerHTML = h < 10 ? '0' + h : h;
    minutes.innerHTML = m < 10 ? '0' + m : m;
    seconds.innerHTML = s < 10 ? '0' + s : s;
}

setTimeout(() => {
    loading.remove();
    countdown.style.display = 'flex';
  }, 1000);
  
// Run every second
setInterval(updateCount, 1000);