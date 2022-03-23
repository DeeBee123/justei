const randomDiv = document.querySelector('.random');
const orderDiv = document.querySelector('.order');
const timer = document.querySelector('strong');
const startBtn = document.querySelector('.start');
const resetBtn = document.querySelector('.reset');

const randomNumber = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

let ballsArray = []
let ballsInOrder = []

const renderBallsToDom = (parentDiv, val, handleEvent) => {
    let newDiv = document.createElement('div');
    newDiv.innerText = val;
    newDiv.className = "number";
    newDiv.style.backgroundColor = val > 9 ? '#' + '0' + val : '#'  + val + '00'
    handleEvent && newDiv.addEventListener('click', (e) => handleEvent(e))
    parentDiv.appendChild(newDiv)
}
let timerID;
const clearEverything = () => {
    randomDiv.innerHTML = '';
    orderDiv.innerHTML = '';
    ballsArray = [];
    ballsInOrder = [];
    clearInterval(timerID)
    timer.innerText = `00 : 00 : 00`
    startBtn.removeAttribute('disabled')

}

const startClock = () => {
    let sec = 0,
        min = 0,
        hrs = 0;
       timerID = setInterval(function() {
        sec += 1;
        if (sec > 59) {
            sec = 0;
            min += 1;
        } else if (min > 59) {
            min = 0;
            hrs += 1;
        } else {
        }
        timer.innerText = `${hrs < 10 ? '0' + hrs : hrs} : ${min < 10 ? '0' + min : min} : ${sec < 10 ? '0' + sec : sec}`
    }, 1000);
}

const renderRandomBalls = () => {
    startClock()
    let i = 0, len = 25;
    while (i < len) {
        let rand = randomNumber(1, 25);
        if (!ballsArray.includes(rand)) {
            renderBallsToDom(randomDiv, rand, checkIfCorrect)
            ballsArray.push(rand);
            i++
        }
    }
    startBtn.setAttribute('disabled', true)
}

const checkIfCorrect = (e) => {
    if (parseInt(e.target.innerText) === ballsInOrder.length + 1) {
        renderBallsToDom(orderDiv, e.target.innerText)
        ballsInOrder.push(e.target.innerText)
        const index = ballsArray.indexOf(parseInt(e.target.innerText));

        if (index > -1) {
            ballsArray.splice(index, 1)
            if(ballsArray.length===0){
                alert(`Congrats you have won! Your time is ${timer.innerText}`)
                clearInterval(timerID)
            }
        }
        randomDiv.innerHTML = ''
        ballsArray.map(el => renderBallsToDom(randomDiv, el, checkIfCorrect))
    } else {
        alert(`don't be silly and look for ball ${Math.min(...ballsArray)}`)
    }
}

startBtn.addEventListener('click', renderRandomBalls)
resetBtn.addEventListener('click', clearEverything)




