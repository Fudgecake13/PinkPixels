document.addEventListener("DOMContentLoaded", () => {

const cells = document.querySelectorAll(".cell");
let currentPlayer = "X";

const winPatterns = [
[0,1,2], [3,4,5], [6,7,8],
[0,3,6], [1,4,7], [2,5,8],
[0,4,8], [2,4,6]
];

cells.forEach(cell => {
cell.addEventListener("click", () => {

if (cell.textContent !== "") return;

cell.textContent = currentPlayer;

const result = checkWinner();

if (result === "draw") {
alert("It's a draw!");
resetGame();
}
else if (result) {
alert(result + " wins!");
resetGame();
}
else {
currentPlayer = currentPlayer === "X" ? "💗" : "X";
}
});
});

function checkWinner() {
const values = Array.from(cells).map(c => c.textContent);

for (const [a,b,c] of winPatterns) {
if (values[a] && values[a] === values[b] && values[a] === values[c]) {
return values[a];
}
}

if (values.every(v => v !== "")) return "draw";

return null;
}

function resetGame() {
cells.forEach(c => c.textContent = "");
currentPlayer = "X";
}

});
