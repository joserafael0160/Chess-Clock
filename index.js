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
if((active === 0) || (active === 2)){
  player1.addEventListener("click",()=>{
    player1.style.cursor = "default"; 
    player1.tabIndex = "-1";

    player2.style.backgroundColor = "#00aaef";
    player2.style.cursor = "pointer";      
    player2.tabIndex = "1"; 
    if(active === 2){
      player1.style.backgroundColor = "#444";  
    }
    active = 1;
  })
}

if((active === 0) || (active === 1)){
  player2.addEventListener("click",()=>{
    player2.style.cursor = "default";     
    player2.tabIndex = "-1";  
    
    player1.tabIndex = "1";   
    player1.style.backgroundColor = "#00aaef"; 
    player1.style.cursor = "pointer";   

    if(active === 1){
      player2.style.backgroundColor = "#444";  
    }
    active = 2;
  }) 
}




restartBtn.addEventListener("click",()=>{
  player1.style.backgroundColor = "#444";
  player2.style.backgroundColor = "#444";
  player1.style.cursor = "pointer";      
  player2.style.cursor = "pointer";      

  active = 0;
})