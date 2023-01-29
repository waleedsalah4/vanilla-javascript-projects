const draggable_list = document.getElementById('draggable-list');
const check = document.getElementById('check');

const richestPeople = [
  'Jeff Bezos',
  'Bill Gates',
  'Warren Buffett',
  'Bernard Arnault',
  'Carlos Slim Helu',
  'Amancio Ortega',
  'Larry Ellison',
  'Mark Zuckerberg',
  'Michael Bloomberg',
  'Larry Page'
];


//store listItems
const listItems = [];

let dragStartIndex;

creatList();

//Inset list items to DOM

function creatList() {
    [...richestPeople]
    .map(a => ({value: a, sort:Math.random()}))
    .sort((a, b) => a.sort - b.sort)
    .map(a => a.value)
    .forEach((person , index) => {

        const listItem = document.createElement('li');

        listItem.setAttribute('data-index', index);
        listItem.innerHTML = `
            <span class="number">${index + 1}</span>
            <div class="draggable" draggable="true">
                <p class="person-name">${person}</p>
                <i class="fas fa-grip-lines"></i>
            </div>
        `;
        listItems.push(listItem);

        draggable_list.appendChild(listItem)
    })

    addEventListener();
}

function dragStart() {
   // console.log('Event: ', 'dragstart')
   //console.log(this)

   dragStartIndex = +this.closest('li').getAttribute('data-index')

}

function dragEnter() {
   // console.log('Event: ', 'dragenter')
   this.classList.add('over')
}

function dragLeave() {
   // console.log('Event: ', 'dragleave')
   this.classList.remove('over')

}

function dragOver(e) {
   // console.log('Event: ', 'dragover')
   e.preventDefault()
}

function dragDrop() {
  //  console.log('Event: ', 'drop')
  const dragEndIndex = +this.getAttribute('data-index')
  swapItem(dragStartIndex, dragEndIndex )

  this.classList.remove('over')
}

//swap list item that are drag and drop
function swapItem(fromIndex, toIndex) {
    const itemOne = listItems[fromIndex].querySelector('.draggable')
    const itemTwo = listItems[toIndex].querySelector('.draggable')

    listItems[fromIndex].appendChild(itemTwo);
    listItems[toIndex].appendChild(itemOne);
}

//check the order of list items 
function checkOrder(){
    listItems.forEach((listItem, index) => {
        const personName = listItem.querySelector('.draggable').innerText.trim();
        if(personName !== richestPeople[index]) {
            listItem.classList.add('wrong')
        } else {
            listItem.classList.remove('wrong')
            listItem.classList.add('right')

        }
    })
}


function addEventListener() {
    const draggables = document.querySelectorAll('.draggable');
    const draggableItems = document.querySelectorAll('.draggable-list li');

    draggables.forEach(draggable => {
        draggable.addEventListener('dragstart', dragStart)
    })

    draggableItems.forEach(item => {
        item.addEventListener('dragover', dragOver)
        item.addEventListener('drop', dragDrop)
        item.addEventListener('dragenter', dragEnter)
        item.addEventListener('dragleave', dragLeave)

    })
}

check.addEventListener('click', checkOrder)