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



let active = 0;

const startMinPlayer1 = player1.innerHTML.split(":").reverse();  
let time1 = parseInt(startMinPlayer1[1]) * 60 + parseInt(startMinPlayer1[0]);  
let intervalId;  
const startMinPlayer2 = player2.innerHTML.split(":").reverse();   
let time2 = parseInt(startMinPlayer2[1]) * 60 + parseInt(startMinPlayer2[0]); 

function updateCountDown() {
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

if(active === 0){ 
  player1.addEventListener("click",()=>{
    active = 2; 
    player1.style.cursor = "default"; 
    player1.tabIndex = "-1"; 

    clearInterval(intervalId);
    
    updateCountDown()
    intervalId = setInterval(updateCountDown, 1000);
    player2.style.backgroundColor = "#00aaef"; 
    player2.style.cursor = "pointer";      
    player2.tabIndex = "1"; 
    if(active === 2){
      player1.style.backgroundColor = "#444";  
    } 
  })
}

if(active === 0){
  player2.addEventListener("click",()=>{
    active = 1;  
    player2.style.cursor = "default";     
    player2.tabIndex = "-1";  

    clearInterval(intervalId); 
    updateCountDown();
    intervalId = setInterval(updateCountDown, 1000);
    player1.tabIndex = "1";    
    player1.style.backgroundColor = "#00aaef"; 
    player1.style.cursor = "pointer";    

    if(active === 1){ 
      player2.style.backgroundColor = "#444";  
    }
  }) 
}

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