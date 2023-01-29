const amountOne = document.querySelector('#amount-one')
const amountTwo = document.querySelector('#amount-two')
const currencyOne = document.querySelector('#currency-one')
const currencyTwo = document.querySelector('#currency-two')
const swap = document.getElementById('swap');
const rate = document.getElementById('rate')




// Fetch exchange rates and update the DOM
function caclulate() {
    const currency_one = currencyOne.value;
    const currency_two = currencyTwo.value;
  
    fetch(`https://api.exchangerate-api.com/v4/latest/${currency_one}`)
      .then(res => res.json())
      .then(data => {
        //console.log(data);
        const rate = data.rates[currency_two];
  
        rate.innerText = `1 ${currency_one} = ${rate} ${currency_two}`;
  
        amountTwo.value = (amountOne.value * rate).toFixed(2);
      });
  }


// Event listeners
currencyOne.addEventListener('change', caclulate);
amountOne.addEventListener('input', caclulate);
currencyTwo.addEventListener('change', caclulate);
amountTwo.addEventListener('input', caclulate);

//swap function 
 swap.addEventListener('click', ()=> {
    const temp = currencyOne.value;
    currencyOne.value = currencyTwo.value;
    currencyTwo.value = temp;

    caclulate()
 })
  
 caclulate()
