const board = document.getElementById("board");
const message = document.getElementById("message");

let tiles = [1, 2, 3, 
             4, 5, 6, 
             7, 8, 0]; // 0 = empty

function render() {
    board.innerHTML = "";
    tiles.forEach((num, index) => {
        const tile = document.createElement("div");
        tile.className = num === 0 ? "tile empty" : "tile";
        tile.textContent = num !== 0 ? num : "";
        tile.addEventListener("click", () => moveTile(index));
        board.appendChild(tile);
    });
}

function moveTile(index) {
    const emptyIndex = tiles.indexOf(0);
    const validMoves = [index - 1, index + 1, index - 3, index + 3];

    // Edge correction
    if (index % 3 === 0) validMoves.splice(validMoves.indexOf(index - 1), 1); // left edge
    if (index % 3 === 2) validMoves.splice(validMoves.indexOf(index + 1), 1); // right edge

    if (validMoves.includes(emptyIndex)) {
        [tiles[index], tiles[emptyIndex]] = [tiles[emptyIndex], tiles[index]];
        render();
        checkWin();
    }
}

function checkWin() {
    const win = [1, 2, 3, 4, 5, 6, 7, 8, 0];
    if (tiles.every((val, idx) => val === win[idx])) {
        message.textContent = "🎉 Congratulation! \n You won!";
    } else {
        message.textContent = "";
    }
}
// Shuffle the tiles randomly
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// Start the game
shuffle(tiles);
render();
