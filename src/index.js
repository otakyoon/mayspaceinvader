import '../css/style.scss';
import Space from '../assets/images/space.png';
import Background from '../assets/background.gif';

// Background du site
let body = document.getElementsByTagName('body')[0];
body.style.backgroundImage = `url(${Background})`;


import InvaderController from './InvaderController';
import Player from './player';
import Bulletcontroller from './BulletController';

import bgmusic from "../assets/sounds/bg-music.wav";

// jouer le son bg-music en fond à l'infini
let audio = new Audio(bgmusic);
let musicIsPLaying = false;
document.addEventListener('keydown', function playAudioAfterInteraction() {
    if (!musicIsPLaying) {
        audio.loop = true;
        audio.play();
        musicIsPLaying=true;
    }
    
    // Supprimer l'écouteur d'événements après la première interaction
    //document.removeEventListener('click', playAudioAfterInteraction);
});
let canvas = document.getElementById("game");
let ctx = canvas.getContext("2d");
canvas.height = 600;
canvas.width = 600;
const background = new Image();
background.src = Background;
ctx.Image = background;

const playerBulletController = new Bulletcontroller(canvas, 10, "red", true);
const player = new Player(canvas, 3, playerBulletController);

const invadersBulletController = new Bulletcontroller(canvas, 4, "white", false);
const invaderController = new InvaderController(canvas, invadersBulletController, playerBulletController);

let isGameOver = false;
let didWin = false;


function game() {
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

    if (!isGameOver) {
        invaderController.draw(ctx);
        player.draw(ctx);
        playerBulletController.draw(ctx);
        invadersBulletController.draw(ctx);
    }
    checkGameOver();
    displayGameOver();
}

setInterval(game, 1000 / 60);

function checkGameOver(){
    if(isGameOver){
        return;
    }
    if(invadersBulletController.collideWith(player)){
        isGameOver=true;
    }else if(invaderController.collideWith(player)){
        isGameOver = true;
    }else if(invaderController.invadersRows.length==0){
        invaderController.createInvaders();
        invaderController.moveDownTimerDefault = invaderController.moveDownTimerDefault*1.5;
        invaderController.fireBulletTimerDefault =  invaderController.fireBulletTimerDefault*0.5;
        invaderController.defaultXVelocity = invaderController.defaultXVelocity*1.5;
        invaderController.defaultYVelocity = invaderController.defaultYVelocity*1.5;
        invaderController.updateLevel();
    }
}

function resetG() {

    if (!isGameOver) {
        return;
    }
    isGameOver = false;
    didWin = false;
    player.reset();
    invaderController.reset();
}

function displayGameOver() {
    if (isGameOver) {

        let text = didWin ? "You Win" : "Game Over";
        let textOffset = didWin ? 3.5 : 5;

        ctx.fillStyle = "white";
        ctx.font = "70px Arial";
        ctx.fillText(text, canvas.width / textOffset, canvas.height / 2);

        // Gestion du boutton replay

        if (!document.getElementById("replayButton")) {

            let button = document.createElement("button");
            button.id = "replayButton";
            button.innerHTML = "Replay";

            button.addEventListener("click", () => {
                resetG();
                button.remove();
            });


            document.addEventListener("keydown", (e) => {
                if (e.code === "Enter") {
                    resetG();
                    if (document.getElementById("replayButton")){
                        button.remove();
                    }
                }
            });


            document.body.appendChild(button);
        }
    }
}