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
let gameStarted;


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

// Affiche le vainqueur de la partie
function displayWinner(name) {
  const winnerModal = document.getElementById("winnerModal");
  const restartGame = document.getElementById("restartGame");
  document.getElementById('winner').innerHTML = name;
  gameStarted = false;
  winnerModal.style.display = "block";
  restartGame.onclick = (e) => {
    e.preventDefault();
    player1.score = 0;
    player2.score = 0;
    newGame();
  }
}

// Vérifie si la condition de victoire est remplie
function checkVictory() {
  if ( player1.score >= goal ) {
      displayWinner(player1.pseudo);
      currentScore = 0;
      player1.score = 0;
      player2.score = 0;
    }else if ( player2.score >= goal ) {
      displayWinner(player2.pseudo);
      currentScore = 0;
      player1.score = 0;
      player2.score = 0;
    }
  }

// Lancer de dé
function playOnce() {
  document.getElementById('avatar-p1-lost').style.display = "none";
  document.getElementById('avatar-p2-lost').style.display = "none";
  let result = roll();
  setTimeout( () => {
    if (result != 1) {
      currentScore += result;
      currentScoreDisplay.textContent = currentScore; 
    }else {
      if (player === 1) {
        document.getElementById('avatar-p1-lost').style.display = "inline-block";
        player++;
      }else {
        document.getElementById('avatar-p2-lost').style.display = "inline-block";
        player--;
      }
      currentScoreDisplay.textContent = 0;
      currentScore = 0;
      showPlayer(player);
    }
  }, 600);
}

// Mise en relief du joueur actuel
function showPlayer(number){
  if ( number % 2 === 0) {
    document.getElementById('avatar-p2').classList.add('playing');
    document.getElementById('avatar-p2').classList.remove('greyscale');
    document.getElementById('player2-name').classList.add('playing');
    document.getElementById('avatar-p1').classList.remove('playing');
    document.getElementById('avatar-p1').classList.add('greyscale');
    document.getElementById('player1-name').classList.remove('playing');
  }else {
    document.getElementById('avatar-p1').classList.add('playing');
    document.getElementById('avatar-p1').classList.remove('greyscale');
    document.getElementById('player1-name').classList.add('playing');
    document.getElementById('avatar-p2').classList.remove('playing');
    document.getElementById('avatar-p2').classList.add('greyscale');
    document.getElementById('player2-name').classList.remove('playing');
  }
}

//Transfert des points vers le score global
function holdScore(){
  if (player === 1) {
    player1.score += currentScore;
    checkVictory();
    player = 2;
  }else {
    player2.score += currentScore;
    checkVictory();
    player = 1;
  }
  currentScore = 0;
  currentScoreDisplay.textContent = currentScore;
  displayScores();
  showPlayer(player);
}

// Nouvelle partie
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

// Actualisation des scores
function displayScores(){
  player1Score.textContent = player1.score;
  player2Score.textContent = player2.score;
}

// Lancement de la partie
function startGame() {
  currentScoreDisplay.textContent = 0;
  player1Score.textContent = 0;
  player2Score.textContent = 0;
  player = Math.floor(Math.random() * 2) + 1;
  gameStarted = true;
  showPlayer(player);
  displayScores();
}

//Bouton Lancer le dé
rollBtn.onclick = (e) => {
  e.preventDefault();
  playOnce();
}

//Bouton Valider Score
holdBtn.onclick = (e) => {
  e.preventDefault();
  holdScore();
}

//Jeu au clavier
document.addEventListener('keypress', (e) => {
  if (gameStarted) {
    let key = e.key;
    console.log(key);
    switch (key) {
      case " ":
        playOnce();
        break;
      case "Enter":
        holdScore();
        break;
      default:
        return;
    }
  }
})

// Fermeture des modals
closeWinModal.onclick = function() {
  winnerModal.style.display = "none";
}

// Fermeture des modals si clic en-dehors
window.onclick = function(event) {
  if (event.target == winnerModal) {
      winnerModal.style.display = "none";
  }
}