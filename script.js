const cells = document.querySelectorAll(".cell");

let currentPlayer = "X";

cells.forEach(cell => {
cell.addEventListener("click", handleClick);
});

function handleClick() {
this.textContent = currentPlayer;
currentPlayer = currentPlayer === "X" ? "❤️" : "X";
}
