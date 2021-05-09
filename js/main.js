import * as game from "./game.js";
import * as form from "./formValidation.js";

/*-- Rules Modal --*/
let rulesModal = document.getElementById("rulesModal");
let btnRules = document.getElementById("btn-rules");
let closeRules = document.getElementsByClassName("closeRules")[0];

btnRules.onclick = function(e) {
    e.preventDefault();
    rulesModal.style.display = "block";
}

closeRules.onclick = function() {
    rulesModal.style.display = "none";
}

/*-- New Game Modal --*/
const startGameModal = document.getElementById("startGameModal");
const btnNewGame = document.getElementById("btn-newGame");
const closeNewGame = document.getElementsByClassName("closeNewGame")[0];
const startGameBtn = document.getElementById("startGame");

btnNewGame.onclick = function(e) {
    e.preventDefault();
    startGameModal.style.display = "block";
}

closeNewGame.onclick = function() {
    startGameModal.style.display = "none";
}

window.onclick = function(event) {
    if (event.target == startGameModal) {
        startGameModal.style.display = "none";
    }
    if (event.target == rulesModal) {
        rulesModal.style.display = "none";
    }
}

startGameBtn.onclick = (e) => {
    e.preventDefault();
    console.log(form.validForm());
    if (form.validForm()) {
        game.newGame();
    }
    //game.newGame();

}
