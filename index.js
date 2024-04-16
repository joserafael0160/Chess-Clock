"use strict"; 

// Players
const player1 = document.getElementById("player1"); 
const player2 = document.getElementById("player2");

// Buttons
const pauseStartBtn = document.querySelector(".pause-start-btn");
const restartBtn = document.querySelector(".restart-btn");
const settingBtn = document.querySelector(".setting-btn");

// Icons
const pauseStartIco = document.querySelector(".pause-start-btn-img");
const restartIco = document.querySelector(".restart-btn-img");
const settingIco = document.querySelector(".setting-btn-img");

// Modal
const settingModal = document.getElementById("settings-dialog")
const cancelBtn = document.querySelector(".cancel");
const acceptBtn = document.querySelector(".accept");

const tickAudio = new Audio("resources/tick.mp4")
const lostAudio = new Audio("resources/lostAudio.mp3")
let active = 0;

let startMinPlayer1 = player1.innerHTML.split(":").reverse();  
let time1 = parseInt(startMinPlayer1[1]) * 60 + parseInt(startMinPlayer1[0]);  
let intervalId;  
let startMinPlayer2 = player2.innerHTML.split(":").reverse();   
let time2 = parseInt(startMinPlayer2[1]) * 60 + parseInt(startMinPlayer2[0]); 
let additionTime = 0;

function updateCountDown() {
  if(time1 <= 0) {
    clearInterval(intervalId);
    player1.innerHTML = "**You Lost**"
    player1.style.backgroundColor = "#f22";
    player2.style.backgroundColor = "#4e4"; 
    player1.style.cursor = "default";      
    player2.style.cursor = "default";      
    active = 3;
    lostAudio.play();
    return; 
  }
  if(time2 <= 0) {
    clearInterval(intervalId);
    player2.innerHTML = "**You Lost**"
    player1.style.backgroundColor = "#4e4";
    player2.style.backgroundColor = "#f22"; 
    player1.style.cursor = "default";      
    player2.style.cursor = "default";     
    active = 3;
    lostAudio.play(); 
    return;
  }
  if(active === 1){
    const minutes = Math.floor(time1 / 60);
    let seconds = time1 % 60;
    seconds = seconds < 10 ? "0" + seconds : seconds;
    player1.innerHTML = `${minutes}:${seconds}`;
    time1--;  
  }  
  if (active === 2){ 
    const minutes = Math.floor(time2 / 60); 
    let seconds = time2 % 60;
    seconds = seconds < 10 ? "0" + seconds : seconds;
    player2.innerHTML = `${minutes}:${seconds}`;
    time2--; 
  } 
  
}

function addingTime() {
  if(active === 1) {
    time1 += additionTime;
    const minutes = Math.floor(time1 / 60);
    let seconds = time1 % 60;
    seconds = seconds < 10 ? "0" + seconds : seconds;
    player1.innerHTML = `${minutes}:${seconds}`;
    
  }
  if (active === 2){ 
    time2 += additionTime;
    const minutes = Math.floor(time2 / 60); 
    let seconds = time2 % 60;
    seconds = seconds < 10 ? "0" + seconds : seconds;
    player2.innerHTML = `${minutes}:${seconds}`;
  
  }
}

player1.addEventListener("click",()=>{
    if(active === 0 || active == 1){ 
    addingTime();   
    clearInterval(intervalId);
    intervalId = setInterval(updateCountDown, 1000);
    tickAudio.play();
    active = 2;   
    player1.style.cursor = "default"; 
    player1.tabIndex = "-1"; 
    player2.style.backgroundColor = "#00aaef"; 
    player2.style.cursor = "pointer";      
    player2.tabIndex = "1"; 
    if(active === 2){
      player1.style.backgroundColor = "#444";  
    } 
  }
}) 


  player2.addEventListener("click",()=>{
    if(active === 0 || active === 2){
    addingTime();
    clearInterval(intervalId);
    intervalId = setInterval(updateCountDown, 1000);
    active = 1;    
    player2.style.cursor = "default";     
    player2.tabIndex = "-1";  

    tickAudio.play(); 
    player1.tabIndex = "1";    
    player1.style.backgroundColor = "#00aaef"; 
    player1.style.cursor = "pointer";    

    if(active === 1){ 
      player2.style.backgroundColor = "#444";  
    }
  }
}) 

pauseStartBtn.addEventListener("click",()=>{
  clearInterval(intervalId); 
  if(active === 1) { 
    player1.style.backgroundColor ="#006699";   
  }
  if(active === 2) {  
    player2.style.backgroundColor ="#006699";     
  }  
})


restartBtn.addEventListener("click",()=>{
  player1.style.backgroundColor = "#444";
  player1.style.cursor = "pointer";
  player1.innerHTML = startMinPlayer1[1] + ":" + startMinPlayer1[0]; 
  player2.innerHTML = startMinPlayer2[1] + ":" + startMinPlayer2 [0];  
  time1 = parseInt(startMinPlayer1[1]) * 60 + parseInt(startMinPlayer1[0]);
  time2 = parseInt(startMinPlayer2[1]) * 60 + parseInt(startMinPlayer2[0]); 

  player2.style.backgroundColor = "#444";
  player2.style.cursor = "pointer";      

  active = 0;
})

settingBtn.addEventListener("click",()=>{
  clearInterval(intervalId); 
  if(active === 1) { 
    player1.style.backgroundColor ="#006699";   
  }
  if(active === 2) {  
    player2.style.backgroundColor ="#006699";     
  }  
  settingModal.showModal();
})
cancelBtn.addEventListener("click",()=>{
  settingModal.close();  
})

acceptBtn.addEventListener("click",()=>{
  let timeSelected = document.getElementById('timeSelect');
  let addTimeSelect = document.getElementById('add-timeSelect');
  let timeSelect = timeSelected.options[timeSelected.selectedIndex].value;
  console.log(additionTime); 
  additionTime = parseInt(addTimeSelect.options[addTimeSelect.selectedIndex].value);
  if(timeSelect == 10) { 
    startMinPlayer1 = ["00","10"];
    startMinPlayer2 = ["00","10"];
  } else if(timeSelect == 5){
    startMinPlayer1 = ["00","5"];  
    startMinPlayer2 = ["00","5"];
  }

  player1.innerHTML = startMinPlayer1[1] + ":" + startMinPlayer1[0]; 
  player2.innerHTML = startMinPlayer2[1] + ":" + startMinPlayer2 [0];  
  time1 = parseInt(startMinPlayer1[1]) * 60 + parseInt(startMinPlayer1[0]);
  time2 = parseInt(startMinPlayer2[1]) * 60 + parseInt(startMinPlayer2[0]); 
  clearInterval(intervalId);
  active = 0;

  player1.style.backgroundColor = "#444";
  player1.style.cursor = "pointer"; 
  player2.style.backgroundColor = "#444";
  player2.style.cursor = "pointer"; 
  settingModal.close();  
})
