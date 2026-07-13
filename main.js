/* =====================================================

   THE RIDGE SOCIETY
   Version 1.0.0

=====================================================*/

// =========================
// Elements
// =========================

const newGame = document.getElementById("newGame");
const continueGame = document.getElementById("continueGame");
const episodes = document.getElementById("episodes");
const settings = document.getElementById("settings");
const credits = document.getElementById("credits");

const fade = document.getElementById("fade");
const loadingScreen = document.getElementById("loadingScreen");
const menuMusic = document.getElementById("menuMusic");

// =========================
// Start Menu Music
// =========================

window.onload = () => {

    menuMusic.volume = 0.35;

    menuMusic.play().catch(() => {

        console.log("Music will begin after user interaction.");

    });

};

// =========================
// Fade Function
// =========================

function fadeToBlack(nextPage){

    fade.style.transition = "opacity 1s";

    fade.style.opacity = "1";

    loadingScreen.style.display = "flex";

    setTimeout(()=>{

        window.location.href = nextPage;

    },1000);

}

// =========================
// Buttons
// =========================

newGame.onclick = ()=>{

    fadeToBlack("game.html");

};

continueGame.onclick = ()=>{

    alert("Continue system coming in V1.1");

};

episodes.onclick = ()=>{

    alert("Episode Select coming soon.");

};

settings.onclick = ()=>{

    alert("Settings menu coming soon.");

};

credits.onclick = ()=>{

    alert("Credits page coming soon.");

};

// =========================
// Keyboard Navigation
// =========================

const buttons = [

    newGame,
    continueGame,
    episodes,
    settings,
    credits

];

let selected = 0;

buttons[selected].focus();

document.addEventListener("keydown",(event)=>{

    if(event.key==="ArrowDown"){

        selected++;

        if(selected>=buttons.length){

            selected=0;

        }

        buttons[selected].focus();

    }

    if(event.key==="ArrowUp"){

        selected--;

        if(selected<0){

            selected=buttons.length-1;

        }

        buttons[selected].focus();

    }

    if(event.key==="Enter"){

        buttons[selected].click();

    }

});
