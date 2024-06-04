let displayScore = document.getElementById("score");
let score = 0;

export function addScore(type) {
    let level = document.getElementById("level").innerHTML;
    score = (score + (type * 5) * level);
    displayScore.innerHTML = score;
}

export function resetScore() {
    score = 0;
    displayScore.innerHTML = score;
}