const addUserBtn = document.querySelector('#addUser')
const doubleMoneyBtn = document.querySelector('#doubleMoney')
const showMillionairesBtn = document.querySelector('#show-millionaires')
const sortBtn = document.querySelector('#sort')
const calculateWealthBtn = document.querySelector('#calculate-wealth')
const main = document.querySelector('#main')


let data = [];

getRandomUser();
getRandomUser();
getRandomUser();


// Fetch random user and add money
async function getRandomUser() {
    const res = await fetch('https://randomuser.me/api');
    const data = await res.json();
   

    const user = data.results[0];
  
    const newUser = {
      name: `${user.name.first} ${user.name.last}`,
      money: Math.floor(Math.random() * 1000000)
    };
  
    addUser(newUser);
  }
  

//add new User
function addUser(newUser) {
  data.push(newUser);
    updateDom();
}


//update dom
function updateDom(providedData = data){
    main.innerHTML = `<h2><strong>Person</strong> Wealth</h2>`
    providedData.forEach(item => {
        const markup = `
        <div class="person"><strong>${item.name}</strong> ${formatMoney(item.money)}</div>
        
        `;
        main.insertAdjacentHTML('beforeend', markup)
    })
}


// Format number as money 
function formatMoney(number) {
    return '$' + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}

//Double Money 
function doubleMoney() {
    data = data.map(user => {
      return{ ...user, money: user.money * 2}
    })
    updateDom();
}


//show only millionairs
function showOnlyMillioairs() {
  data= data.filter(user => user.money > 1000000);

  updateDom()
}



//sort by richest 
function sortByRichest() {
  data.sort((a, b)=> {
    return b.money - a.money
  })
  updateDom()
}


//calculate entire wealth
function calculateEntireWealth() {
  let entireWealth = data.reduce((acc, user) => acc += user.money ,0);

  const markup = `
  <div>
    <h3>Total Wealth: <strong>${formatMoney(entireWealth)}</strong></h3>
  </div>
  
  `;
  main.insertAdjacentHTML('beforeend', markup)
}







addUserBtn.addEventListener('click', getRandomUser)
doubleMoneyBtn.addEventListener('click', doubleMoney)
showMillionairesBtn.addEventListener('click', showOnlyMillioairs)
sortBtn.addEventListener('click', sortByRichest)
calculateWealthBtn.addEventListener('click', calculateEntireWealth)

