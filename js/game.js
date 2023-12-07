let turn = 0    // Turn 0 = red, Turn 1 = yellow
let gameDone = false

let rows = 6;
let columns = 7;

// 'Red' player slot is a 1, 'Yellow' player slot is a 2. 0 Means empty slot.
let slots = [
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0], 
  [0, 0, 0, 0, 0, 0, 0]]

function newGame() {
  if (gameDone !== true) return;
  for (r = 1; r <= rows; r++) {
    for (c = 1; c <= columns; c ++) {
      slots[r-1][c-1] = 0;
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
  if (color === 1) slot.src=redoptions[redcircle];
  else if (color === 2) slot.src=yellowoptions[yellowcircle];
}

function getColor() {
  if (turn === 0) return 1;
  else return 2;
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
    if (slots[r][c] !== 0) {
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
      if (slots[r][c] !== 0) {
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
      if (slots[r][c] !== 0) {
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
      if (slots[r][c] !== 0) {
        if (slots[r][c] == slots[r-1][c+1] && slots[r-1][c+1] == slots[r-2][c+2] && slots[r-2][c+2] == slots[r-3][c+3]) {
          gameWon(slots[r][c]);
          return;
        }
      }
    }
  }
}

function gameWon(winningColor) {
  if (winningColor === 1) {
    document.getElementById("winner").innerText="RED WINS!!!"
    document.getElementById("winner").className="red"
    gameDone = true;
  }
  else if (winningColor === 2) {
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

  let settingsButton = document.getElementById("settings");
  settingsButton.classList.toggle("instructionsBackground")
}

function toggleSettings() {
  let settings = document.getElementById("settingsModal");
  settings.classList.toggle("settingsOn");
  settings.classList.toggle("settingsOff");

  let settingsButton = document.getElementById("settings");
  settingsButton.classList.toggle("instructionsBackground")

  let howtoButton = document.getElementById("howToButton");
  howtoButton.classList.toggle("instructionsBackground")
}


redoptions = ["img/redcircle.png", "img/redcircle2.png", "img/redcircle3.png"];
redcircle = 0;

yellowoptions = ["img/yellowcircle.png", "img/yellowcircle2.png", "img/yellowcircle3.png"];
yellowcircle = 0;

function nextRed() {
  redcircle += 1;
  if (redcircle >= redoptions.length) {
    redcircle = 0;
  }
  document.getElementById("redSettingImg").src=redoptions[redcircle];
  for (r = 1; r <= rows; r++) {
    for (c = 1; c <= columns; c ++) {
      if (slots[r-1][c-1] === 1) {
        document.getElementById("Slot" + c + r).src=redoptions[redcircle];
      }
    }
  }
}

function nextYellow() {
  yellowcircle += 1;
  if (yellowcircle >= yellowoptions.length) {
    yellowcircle = 0;
  }
  document.getElementById("yellowSettingImg").src=yellowoptions[yellowcircle];
  for (r = 1; r <= rows; r++) {
    for (c = 1; c <= columns; c ++) {
      if (slots[r-1][c-1] === 2) {
        document.getElementById("Slot" + c + r).src=yellowoptions[yellowcircle];
      }
      
    }
  }
}