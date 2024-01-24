let scores = localStorage.getItem("scores")
let lines = localStorage.getItem("lines")


var finalScore = document.getElementById("scores")
var finalLines = document.getElementById("lines")
finalScore.innerHTML = scores
finalLines.innerHTML = lines


var home = document.getElementById("home")
const playAgain = document.getElementById("play-again")

home.onclick = () => {
    window.location.href="./index.html"
}

playAgain.onclick = () => {
    window.location.href="./game.html"
}
