const boxes = document.querySelectorAll(".box");
const gameInfo = document.querySelector(".game-info");
const newGameBtn = document.querySelector(".btn");

let currentPlayer;
let gameGrid;

const winningPositions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

//function to initialise the game
function initGame() {
  currentPlayer = "X";
  gameGrid = ["", "", "", "", "", "", "", "", ""];
  //empty the boxes on  UI
  boxes.forEach((box, index) => {
    box.innerText = "";
    boxes[index].style.pointerEvents = "all";
    //initialise box with css properties again
    box.classList = `box box${index + 1}`;
  });
  newGameBtn.classList.remove("active");
  gameInfo.innerText = `Current Player - ${currentPlayer}`;
}

initGame();

function swapTurn() {
  if (currentPlayer === "X") {
    currentPlayer = "O";
  } else {
    currentPlayer = "X";
  }
  //UI Update
  gameInfo.innerText = `Current Player - ${currentPlayer}`;
}

function checkGameOver() {
  let answer = "";

  winningPositions.forEach((position) => {
    //all 3 boxes should be non-empty and exactly same in value
    if (
      (gameGrid[position[0]] !== "" ||
        gameGrid[position[1]] !== "" ||
        gameGrid[position[2]] !== "") &&
      gameGrid[position[0]] === gameGrid[position[1]] &&
      gameGrid[position[1]] === gameGrid[position[2]]
    ) {
      //check if winner is X
      if (gameGrid[position[0]] === "X") answer = "X";
      else {
        answer = "O";
      }

      //disable pointer events
      boxes.forEach((box) => {
        box.style.pointerEvents = "none";
      });

      //now we know X/O is a winner
      boxes[position[0]].classList.add("win");
      boxes[position[1]].classList.add("win");
      boxes[position[2]].classList.add("win");
    }
  });

  //it means we have a winner
  if (answer !== "") {
    gameInfo.innerText = `Winner Player - ${answer}`;
    newGameBtn.classList.add("active");
    return;
  }

  //We know, NO Winner Found, let's check whether there is tie
  let fillCount = 0;
  gameGrid.forEach((box) => {
    if (box !== "") fillCount++;
  });

  //board is Filled, game is TIE
  if (fillCount === 9) {
    gameInfo.innerText = "Game Tied !";
    newGameBtn.classList.add("active");
  }
}

function handleClick(index) {
  if (gameGrid[index] === "") {
    boxes[index].innerText = currentPlayer;
    gameGrid[index] = currentPlayer;
    boxes[index].style.pointerEvents = "none";
    //swap function to change the turn
    swapTurn();
    //check koi jeet toh nahi gya
    checkGameOver();
  }
}

boxes.forEach((box, index) => {
  box.addEventListener("click", () => {
    handleClick(index);
  });
});

newGameBtn.addEventListener("click", initGame);




// ****************** Explanation **********************
// sabse phela hmne ek function bnaya initGame name sa jo ki game ko initialize kr da gya .
// and then hmne har ek boxes pa event handler lga diye h jo ki check kre gya sabse phela ki who particular box empty h ya nhi ..
// agr empty h to us box pa hme inner text kr da gya and pointerevent ko none kr da gya then swapturn function ko call kre gya ..
// player change krne k liye and then checkgameover() function ko call kre gya
// checkgameover() function sabse phela dekha gya ki jo hmne winning position decide kri h agr who true ho jti h to hme apne winner mil ja gya
// and hm sabhi boxes pa pointer event ko none kr da gya