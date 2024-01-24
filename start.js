const startButton = document.getElementById("start-button");

startButton.onclick = () => {
    const nameInput = document.getElementById("name").value;
    const usernameInput = document.getElementById("username").value;

    if (nameInput.trim() !== "" && usernameInput.trim() !== "") {
        window.location.href = "./game.html";
    } else {
        alert("Enter both name and username to procced.");
    }
};
