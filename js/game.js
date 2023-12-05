let turn = 0
// Turn 0 = red, Turn 1 = yellow
let gameDone = false

let rows = 6;
let columns = 7;

let slots = [
  ['', '', '', '', '', '', ''],
  ['', '', '', '', '', '', ''],
  ['', '', '', '', '', '', ''],
  ['', '', '', '', '', '', ''],
  ['', '', '', '', '', '', ''], 
  ['', '', '', '', '', '', '']]

function newGame() {
  if (gameDone !== true) return;
  for (r = 1; r <= rows; r++) {
    for (c = 1; c <= columns; c ++) {
      slots[r-1][c-1] = '';
      document.getElementById("Slot" + c + r).src="img/whitecircle.png";
    }
  }
  gameDone = false;
  document.getElementById("winner").innerHTML="<br>";
  document.getElementById("turn").innerText = "RED's turn..."
  turnText.className = "red";
  turn = 0;
}

function changeColor(slot, color) {
  if (color === 'r') slot.src="img/redcircle.png";
  else if (color === 'y') slot.src="img/yellowcircle.png";
}

function getColor() {
  if (turn === 0) return 'r';
  else return 'y';
}

function changeTurn() {
  turnText = document.getElementById("turn");
  if (turn === 0) {
    turnText.innerText="YELLOW's turn..."
    turnText.className = "yellow";
    turn = 1;
  }
  else {
    turnText.innerText="RED's turn..."
    turnText.className = "red";
    turn = 0;
  }
}

function takeTurn(col)  {
  if (gameDone) return;
  let column = document.getElementById("col" + col).children;
  played = false;
  i=0;
  while(played === false && i < column.length) {
    if (column[i].src.includes("img/whitecircle.png")) {
      changeColor(column[i], getColor());
      slots[i][col-1] = getColor();
      changeTurn();
      played = true;
    }
    else i++;
  }
    
  checkWin();
}

function checkWin() {
  // horizontal
  for (let r = 0; r < rows; r++) {
  for (let c = 0; c < columns - 3; c++){
    if (slots[r][c] !== '') {
      if (slots[r][c] == slots[r][c+1] && slots[r][c+1] == slots[r][c+2] && slots[r][c+2] == slots[r][c+3]) {
        gameWon(slots[r][c]);
        return;
      }
    }
  }
  }

  // vertical
  for (let c = 0; c < columns; c++) {
    for (let r = 0; r < rows - 3; r++) {
      if (slots[r][c] !== '') {
        if (slots[r][c] == slots[r+1][c] && slots[r+1][c] == slots[r+2][c] && slots[r+2][c] == slots[r+3][c]) {
          gameWon(slots[r][c]);
          return;
        }
      }
    }
  }

  // up right diagonal
  for (let r = 0; r < rows - 3; r++) {
    for (let c = 0; c < columns - 3; c++) {
      if (slots[r][c] !== '') {
        if (slots[r][c] == slots[r+1][c+1] && slots[r+1][c+1] == slots[r+2][c+2] && slots[r+2][c+2] == slots[r+3][c+3]) {
          gameWon(slots[r][c]);
          return;
          }
      }
    }
  }

  // up left diagonal
  for (let r = 3; r < rows; r++) {
    for (let c = 0; c < columns - 3; c++) {
      if (slots[r][c] !== '') {
        if (slots[r][c] == slots[r-1][c+1] && slots[r-1][c+1] == slots[r-2][c+2] && slots[r-2][c+2] == slots[r-3][c+3]) {
          gameWon(slots[r][c]);
          return;
        }
      }
    }
  }
}

function gameWon(winningColor) {
  if (winningColor === 'r') {
    document.getElementById("winner").innerText="RED WINS!!!"
    document.getElementById("winner").className="red"
    gameDone = true;
  }
  else if (winningColor === 'y') {
    document.getElementById("winner").innerText="YELLOW WINS!!!"
    document.getElementById("winner").className="yellow"
    gameDone = true;
  }

  if (gameDone == true) {
    document.getElementById("turn").innerText = "Click Here To Play Again"
    turnText.className = "newGame";
  }
}

function toggleInstructions() {
  let howToPlay = document.getElementById("howToPlay");
  howToPlay.classList.toggle("howToPlayOn");
  howToPlay.classList.toggle("howToPlayOff");

  let howtoButton = document.getElementById("howToButton");
  howtoButton.classList.toggle("instructionsBackground")
}