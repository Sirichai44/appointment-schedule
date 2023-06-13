const inputContainer = document.getElementById('input-container');
const countdownform = document.getElementById('countdownform');
const dateEl = document.getElementById('date-picker');
const countdownEl = document.getElementById('countdown');

const countdownTitleEl = document.getElementById('countdown-title');
const countdownBtn = document.getElementById('countdown-btn');
const timeEL = document.querySelectorAll('span');

const completeEL = document.getElementById('complete');
const completeInfoEl = document.getElementById('complete-imfo');
const completeBtn = document.getElementById('complete-btn');


let countdownTitle ='';
let countdownDate = '';

let countdownValue = Date;
let countdownActive;
let saveCountdown;


const second = 1000;
const minute = second*60;
const hour = minute*60;
const day = hour*24;

countdownform.addEventListener('submit', updateCountdown);

function updateCountdown(e){
    e.preventDefault();
    countdownTitle = e.srcElement[0].value;
    countdownDate = e.srcElement[1].value;

    if(countdownTitle === ''){
        alert("Fill value");
    }else{
        saveCountdown ={title:countdownTitle, date:countdownDate};
        localStorage.setItem("countDown", JSON.stringify(saveCountdown));
        countdownValue =new Date(countdownDate).getTime();
        setUpTime();
    }
    console.log(e.srcElement);
}
function setUpTime(){
    countdownActive = setInterval(() => {
        const now = new Date().getTime();
        const distance = countdownValue - now;
        const days = Math.floor(distance/day);
        const hours = Math.floor((distance%day)/hour);
        const minutes = Math.floor((distance%hour)/minute);
        const seconds = Math.floor((distance%minute)/second);
        inputContainer.hidden = true;

        if(distance < 0){
            countdownEl.hidden = true;
            completeEL.hidden = false;
            completeInfoEl.textContent = `${countdownTitle} Date ${countdownDate}`;
            clearInterval(countdownActive);

        }else{
            countdownTitleEl.textContent = `${countdownTitle}`;
            timeEL[0].textContent = `${days}`;
            timeEL[1].textContent = `${hours}`;
            timeEL[2].textContent = `${minutes}`;
            timeEL[3].textContent = `${seconds}`;
            countdownEl.hidden = false;
        }
    }, second);
}

function callDatainStore(){
    if(localStorage.getItem("countDown")){
        inputContainer.hidden = true;
        saveCountdown = JSON.parse(localStorage.getItem("countDown"));
        countdownTitle = saveCountdown.title
        countdownDate = saveCountdown.date;
        countdownValue = new Date(countdownDate).getTime();
        setUpTime();
    }
}
function reset(){
    localStorage.removeItem("countDown");
    countdownEl.hidden = true;
    completeEL.hidden = true;
    inputContainer.hidden = false;
    clearInterval(countdownActive);
    countdownTitle = '';
    countdownDate = '';
}
callDatainStore();

countdownBtn.addEventListener('click', reset);
completeBtn.addEventListener('click', reset);
