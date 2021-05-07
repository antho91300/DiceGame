export let dice = document.querySelector('.dice');
export let faceCourante = '';
import Player from "./playerClass.js";

let player1 = new Player();
let player2 = new Player();
let goal = 0;

const currentScoreDisplay = document.getElementById('current-score');
const player1Score = document.getElementById('player1-score');
const player2Score = document.getElementById('player2-score');
const closeWinModal = document.getElementsByClassName("closeWinModal")[0];
const rollBtn = document.getElementById('btn-roll');
const holdBtn = document.getElementById('btn-hold');
rollBtn.disabled = true;
holdBtn.disabled = true;
let currentScore = 0;
let player;


// Affichage de la face demandée :
function changeSide(face) {
  let nouvelleFace = 'face-' + face;
  if ( faceCourante ) {
    dice.classList.remove( faceCourante );
  }
  dice.classList.add( nouvelleFace );
  faceCourante = nouvelleFace;
}

// Simulation du dé qui roule puis affichage du résultat:
function diceAnimation(face) {
    dice.classList.add("rolling");
    dice.addEventListener("webkitAnimationEnd", changeSide(face),false);
    dice.addEventListener("animationend", changeSide(face),false);
    dice.addEventListener("oanimationend", changeSide(face),false);
    setTimeout( () => {
      dice.classList.remove("rolling");
    } , 600);
}

// Détermine la nouvelle face aléatoirement, puis anime le dé
function roll() {
  let face = Math.floor(Math.random() * 6) + 1 ;
  diceAnimation(face);
  return face;
}

function displayWinner(name) {
  const winnerModal = document.getElementById("winnerModal");
  const restartGame = document.getElementById("restartGame");
  document.getElementById('winner').innerHTML = name;
  winnerModal.style.display = "block";
  restartGame.onclick = (e) => {
    e.preventDefault();
    player1.score = 0;
    player2.score = 0;
    newGame();
  }
}

function checkVictory() {
  if ( player === 1){
    if ( ( currentScore + player1.score ) >= goal ) {
      displayWinner(player1.pseudo);
      currentScore = 0;
      player1.score = 0;
      player2.score = 0;
    }
  }else if ( player === 2){
    if ( ( currentScore + player2.score ) >= goal ) {
      displayWinner(player2.pseudo);
      currentScore = 0;
      player1.score = 0;
      player2.score = 0;
    }
  }
}

function playOnce() {
  let result = roll();
  setTimeout( () => {
    if (result != 1) {
      currentScore += result;
      currentScoreDisplay.textContent = currentScore; 
      checkVictory();
    }else {
      currentScoreDisplay.textContent = 0;
      currentScore = 0;
      if (player === 1) {
        player++;
        //playOnce(); /* Relance immédiatement pour le joueur suivant */
      }else {
        player--;
        //playOnce(); /* Relance immédiatement pour le joueur suivant */
      }
      showPlayer(player);
    }
  }, 600);
}

function showPlayer(number){
  if ( number % 2 === 0) {
    document.getElementById('avatar-p2').classList.add('playing');
    document.getElementById('player2-name').classList.add('playing');
    document.getElementById('avatar-p1').classList.remove('playing');
    document.getElementById('player1-name').classList.remove('playing');
  }else {
    document.getElementById('avatar-p1').classList.add('playing');
    document.getElementById('player1-name').classList.add('playing');
    document.getElementById('avatar-p2').classList.remove('playing');
    document.getElementById('player2-name').classList.remove('playing');
  }
}

export function newGame() {
  if (!player1.pseudo && !player2.pseudo){
    let player1Name = document.getElementById('p1-name').value;
    let player2Name = document.getElementById('p2-name').value;
    player1.pseudo = player1Name;
    player2.pseudo = player2Name;
    goal = document.getElementById('goalScore').value;
  }
  document.getElementById('player1-name').textContent = player1.pseudo;
  document.getElementById('player2-name').textContent = player2.pseudo;
  document.getElementById('goal-description').style.display = 'block';
  document.getElementById('goal').innerHTML = goal;
  document.getElementById('startGameModal').style.display = "none";
  document.getElementById('winnerModal').style.display = "none";
  document.getElementById('btn-roll').classList.remove('isDisabled');
  document.getElementById('btn-hold').classList.remove('isDisabled');
  startGame();
}

function displayScores(){
  player1Score.textContent = player1.score;
  player2Score.textContent = player2.score;
}

function startGame() {
  currentScoreDisplay.textContent = 0;
  player1Score.textContent = 0;
  player2Score.textContent = 0;
  player = Math.floor(Math.random() * 2) + 1;
  showPlayer(player);
  displayScores();
}

rollBtn.onclick = (e) => {
  e.preventDefault();
  playOnce();
}

holdBtn.onclick = (e) => {
  e.preventDefault();
  if (player === 1) {
    player1.score += currentScore;
    player = 2;
  }else {
    player2.score += currentScore;
    player = 1;
  }
  currentScore = 0;
  currentScoreDisplay.textContent = currentScore;
  displayScores();
  showPlayer(player);
}

closeWinModal.onclick = function() {
  winnerModal.style.display = "none";
}

window.onclick = function(event) {
  if (event.target == winnerModal) {
      winnerModal.style.display = "none";
  }
}