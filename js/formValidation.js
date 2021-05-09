export const form = document.getElementById('newGameForm');
export const pseudo1 = document.getElementById('p1-name');
export const pseudo2 = document.getElementById('p2-name');
export const goal = document.getElementById('goalScore');
export const p1Error = document.getElementById('p1-error');
export const p2Error = document.getElementById('p2-error');
export const goalError = document.getElementById('goal-error');
let formValid = false;
let p1Valid = false;
let p2Valid = false;
let goalValid = false;

function checkPseudo(e) {
    if (e.value.length < 3 || e.value.length > 10) {
        e.nextElementSibling.style.display = "block";
        if (e.getAttribute('name') == 'p1-name') {
            p1Valid = false;
        }else if (e.getAttribute('name') == 'p2-name') {
            p2Valid = false;
        }
    }else {
        e.nextElementSibling.style.display = "none";
        if (e.getAttribute('name') == 'p1-name') {
            p1Valid = true;
        }else if (e.getAttribute('name') == 'p2-name') {
            p2Valid = true;
        }
    }
}

function checkGoal(e) {
    if (e.value < 50 || e.value >= 400) {
        e.nextElementSibling.style.display = "block";
        goalValid = false;
    }else {
        e.nextElementSibling.style.display = "none";
        goalValid = true;
    }
}

pseudo1.addEventListener('input', (e) => {
    checkPseudo(e.target);
}, false)

pseudo2.addEventListener('input', (e) => {
    checkPseudo(e.target);
}, false)

goal.addEventListener('input', (e) => {
    checkGoal(e.target);
}, false)

export function validForm(){
    if ( p1Valid && p2Valid && goalValid ) {
        formValid = true;
    }else {
        checkPseudo(pseudo1);
        checkPseudo(pseudo2);
        checkGoal(goal);
        formValid = false;
    }
    return formValid;
}