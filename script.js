const cells = document.querySelectorAll(".cell");

let currentPlayer = "X";

cells.forEach(cell => {
cell.addEventListener("click", handleClick);
});

function handleClick() {
if (this.textContent !== "") return;

this.textContent = currentPlayer;

const result = checkWinner();
if (result === "draw") {
alert("It's a draw!");
cells.forEach(cell => cell.removeEventListener("click", handleClick));
} else if (result) {
alert(result + " wins!");
cells.forEach(cell => cell.removeEventListener("click", handleClick));
} else {
currentPlayer = currentPlayer === "X" ? "💗" : "X";
}
}

const winPatterns = [
[0,1,2], [3,4,5], [6,7,8],
[0,3,6], [1,4,7], [2,5,8],
[0,4,8], [2,4,6]
];

function checkWinner() {
const values = Array.from(cells).map(cell => cell.textContent);

for (const pattern of winPatterns) {
const [a, b, c] = pattern;
if (values[a] && values[a] === values[b] && values[a] === values[c]) {
return values[a];
}
}

if (values.every(v => v !== "")) {
return "draw";
}

return null;
}
