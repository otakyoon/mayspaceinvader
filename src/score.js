let displayScore = document.getElementById("score");
let score = 0;

export function addScore(type) {
    score = ((score) + (type * 5));

    //Combo with level
    let level = document.getElementById("level").innerHTML;
    score = score * level;

    displayScore.innerHTML = score;
}

export function resetScore() {
    score = 0;
    displayScore.innerHTML = score;
}