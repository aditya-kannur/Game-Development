const startButton = document.getElementById("start-button");
const backgroundMusic = document.getElementById("background-music");

startButton.addEventListener("click", () => {
    const name = document.getElementById("name").value;
    const username = document.getElementById("username").value;

    if (name && username) {
        window.location.href = "./game.html";
        backgroundMusic.play();
    } else {
        alert("Please fill in both name and username.");
    }
});
