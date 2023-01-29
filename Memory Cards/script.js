const cardsContainer = document.getElementById('cards-container');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const currentEl = document.getElementById('current');
const showBtn = document.getElementById('show');
const hideBtn = document.getElementById('hide');
const questionEl = document.getElementById('question');
const answerEl = document.getElementById('answer');
const addCardBtn = document.getElementById('add-card');
const clearBtn = document.getElementById('clear');
const addContainer = document.getElementById('add-container');

//keep track of current card
let currentActiveCard = 0;

//store Dom Cards
const cardsEl = [];

//store card data
const cardsData = getCardsData();

// const cardsData = [
//   {
//     question: 'What must a variable begin with?',
//     answer: 'A letter, $ or _'
//   },
//   {
//     question: 'What is a variable?',
//     answer: 'Container for a piece of data'
//   },
//   {
//     question: 'Example of Case Sensitive Variable',
//     answer: 'thisIsAVariable'
//   }
// ];

function creatCards() {
    cardsData.forEach((data ,index) => creatCard(data, index))
}



function creatCard(data, index){
    const card = document.createElement('div');
    card.classList.add('card');

    if (index === 0) {
        card.classList.add('active');
    }

    card.innerHTML = `
        <div class="inner-card">
            <div class="inner-card-front">
                <p>
                ${data.question}
                </p>
            </div>
            <div class="inner-card-back">
                <p>
                ${data.answer}
                </p>
            </div>
        </div>
    `;

    card.addEventListener('click', ()=> card.classList.toggle('show-answer'))
    //add to dom cards
    cardsEl.push(card)

    cardsContainer.appendChild(card);

    updateCurrentText()
}


    //show number of cards
function updateCurrentText() {
    currentEl.innerHTML = `${ currentActiveCard + 1}/${cardsEl.length}`
}

// get cards from local storage
function getCardsData(){
    const cards = JSON.parse(localStorage.getItem('cards'));
    return cards === null ? [] : cards;
}

//add cards to local storage
function setCardsData (cards) {
    localStorage.setItem('cards', JSON.stringify(cards))
    window.location.reload()
}

creatCards();

// Next button
nextBtn.addEventListener('click', () => {
    cardsEl[currentActiveCard].className = 'card left';
  
    currentActiveCard = currentActiveCard + 1;
  
    if (currentActiveCard > cardsEl.length - 1) {
      currentActiveCard = cardsEl.length - 1;
    }
  
    cardsEl[currentActiveCard].className = 'card active';
  
    updateCurrentText();
  });
  
  // Prev button
  prevBtn.addEventListener('click', () => {
    cardsEl[currentActiveCard].className = 'card right';
  
    currentActiveCard = currentActiveCard - 1;
  
    if (currentActiveCard < 0) {
      currentActiveCard = 0;
    }
  
    cardsEl[currentActiveCard].className = 'card active';
  
    updateCurrentText();
  });


// // show form that contains q & a
function showForm() {
    addContainer.classList.add('show')
}

function hideAddContainer() {
    addContainer.classList.remove('show')

}

//add new card
function addCard(){
    const question = questionEl.value;
    const answer = answerEl.value;

    if(question.trim() && answer.trim()) {
        const newCard = {question, answer}
        creatCard(newCard);
        questionEl.value = ''
        answer.value = ''
        addContainer.classList.remove('show')

        cardsData.push(newCard)
        setCardsData(cardsData)
    }
    
}

showBtn.addEventListener('click', showForm)
hideBtn.addEventListener('click', hideAddContainer)
addCardBtn.addEventListener('click',addCard)


//clear cards buttons

clearBtn.addEventListener('click', () => {
    localStorage.clear();
    cardsContainer.innerHTML = ''
    window.location.reload()
})