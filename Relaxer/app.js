const container = document.querySelector('#container');
const text = document.querySelector('#text')
  
const totalTime = 7500;
const breathTime = (totalTime/5) * 2;
const holdTime = totalTime / 5;

breath();

function breath() {
    text.textContent = 'Breath In!';
    container.className = 'container grow'

    setTimeout(()=> {
        text.textContent = 'Hold'

        setTimeout(()=> {
            text.textContent = 'Breath Out!';
            container.className = 'container shrink'

        }, holdTime)
    },breathTime)

};

setInterval(breath, totalTime);