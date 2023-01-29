const word = document.getElementById('word');
const text = document.getElementById('text');
const scoreEl = document.getElementById('score');
const timeEl = document.getElementById('time');
const endgameEl = document.getElementById('end-game-container');
const settingsBtn = document.getElementById('settings-btn');
const settings = document.getElementById('settings');
const settingsForm = document.getElementById('settings-form');
const difficultySelect = document.getElementById('difficulty');

// List of words for game
const words = [
  'sigh',
  'tense',
  'airplane',
  'ball',
  'pies',
  'juice',
  'warlike',
  'bad',
  'north',
  'dependent',
  'steer',
  'silver',
  'highfalutin',
  'superficial',
  'quince',
  'eight',
  'feeble',
  'admit',
  'drag',
  'loving'
];

// Init word
let randomWord;

//Init score
let score = 0;
// Init time
let time = 10;

let difficulty = localStorage.getItem('difficulty') !== null ? localStorage.getItem('difficulty') : 'medium'

//set difficulty select value
difficultySelect.value = localStorage.getItem('difficulty') !== null ? localStorage.getItem('difficulty') : 'medium'



//Focus on text on start
text.focus();

//Start counting down
const timeInterval = setInterval(UpdateTime, 1000);

// genrate random word from array
function getRandomWord(){
  return words[Math.floor(Math.random() * words.length)]
}

//add word to DOM
function addWordToDOM(){
  randomWord = getRandomWord();
  word.innerHTML = randomWord;
}

//Update Score
function UpdateScore(){
  score++;
  scoreEl.innerHTML = score;
}

//Update time
function UpdateTime(){
  time--;
  timeEl.innerHTML = time + 's';

  if(time === 0){
    clearInterval(timeInterval)

    //end game
    gameOver();
  }
}

 //Game Over
 function gameOver(){
  endgameEl.innerHTML = `
    <h1>Time ran out</h1>
    <p>Your final score is ${score}</p>
    <button onclick="location.reload()">Reload</button>
  `;
  endgameEl.style.display = 'flex'
 }


addWordToDOM();

//Event listeners
//typing
text.addEventListener('input', e => {
  const insertedText = e.target.value;

  if(insertedText === randomWord){
    addWordToDOM();
    UpdateScore();

    //clear
    e.target.value = '';

    if(difficulty === 'hard') {
      time +=2;
    }else if(difficulty === 'medium') {
      time +=2;
    } else {
      time +=5;
    }
    UpdateTime();
  }
})

// setting btn click
settingsBtn.addEventListener('click', () => {
  settings.classList.toggle('hide')
});

// settings select
settingsForm.addEventListener('change', (e)=> {
  difficulty = e.target.value;
  localStorage.setItem('difficulty', difficulty);
})