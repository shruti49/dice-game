/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

let activePlayer,
  currentScore,
  totalScore,
  image1,
  image2,
  parent,
  input,
  winningPoint,
  prevDice1,
  prevDice2;

function init() {
  activePlayer = 1;
  currentScore = 0;
  totalScore = [0, 0];

  parent = document.getElementById('game');
  input = document.querySelector('.final-score').value;

  //IMAGES
  image1 = document.querySelector('.dice__1');
  image2 = document.createElement('img');
  image2.className = `dice__2`;
  parent.appendChild(image2);

  //HEADERS
  document.getElementById(`header-1`).textContent = 'player 1';
  document.getElementById(`header-2`).textContent = 'player 2';

  //TOTALSCORE
  document.getElementById(`totalscore-1`).textContent = 0;
  document.getElementById(`totalscore-2`).textContent = 0;

  //CURRENTSCORE
  document.getElementById(`currentscore-1`).textContent = 0;
  document.getElementById(`currentscore-2`).textContent = 0;

  //TOGGLING CLASSES
  document.querySelector(`.player-1`).classList.remove('winner');
  document.querySelector(`.player-2`).classList.remove('winner');
  document.querySelector(`.player-1`).classList.add('active');

  document.getElementById('roll').addEventListener('click', rolldice);
  document.getElementById('hold').addEventListener('click', displayTotalScore);
}

init();

function nextPlayer() {
  //TOGGLING THE CLASSES
  document.getElementById(`currentscore-${activePlayer}`).textContent = 0;
  document.querySelector(`.player-${activePlayer}`).classList.toggle('active');

  //HINDING THE IMAGES
  image1.style.display = 'none';
  image2.style.display = 'none';

  //SCORE SET TO ZERO AGAIN
  activePlayer === 1 ? (activePlayer = 2) : (activePlayer = 1);
  currentScore = 0;
  document.querySelector(`.player-${activePlayer}`).classList.toggle('active');
}

const displayCurrentScore = (rn1, rn2) => {
  if ((prevDice1 === 6 && rn1 === 6) || (prevDice2 === 6 && rn2 === 6)) {
    console.log('yes');
    totalScore[activePlayer - 1] = 0;
    document.getElementById(`totalscore-${activePlayer}`).textContent = 0;
    nextPlayer();
  } //IF A DICE SHOWS NO 1 THEN NEXT PLAYER TURN
  else if (rn1 === 1 || rn2 === 1) {
    nextPlayer();
  } //ADDING CURRENT SCORE
  else {
    currentScore = currentScore + rn1 + rn2;
    document.getElementById(
      `currentscore-${activePlayer}`
    ).textContent = currentScore;
  }
  prevDice1 = rn1;
  prevDice2 = rn2;
};

function rolldice() {
  //GENERATING TWO RANDOM NUMBERS
  const [no1, no2] = [
    Math.floor(Math.random() * 6) + 1,
    Math.floor(Math.random() * 6) + 1
  ];

  //DISPLAYING IMAGES
  image1.style.display = 'block';
  image2.style.display = 'block';

  //CHANGING THE IMAGES
  image1.src = `images/dice-${no1}.png`;
  image2.src = `images/dice-${no2}.png`;

  //DISPLAYING THE CURRENT SCORE - PASSING RANDOME NOS AS PARAMETERS
  displayCurrentScore(no1, no2);
}

function displayTotalScore() {
  //ADDING CURRENT SCORE TO GLOBAL SCORE
  totalScore[activePlayer - 1] += currentScore;
  console.log(activePlayer - 1);

  //UPDATING UI
  document.getElementById(`totalscore-${activePlayer}`).textContent =
    totalScore[activePlayer - 1];

  //CHECKING FOR TRUTHY AND FALSY VALUES
  if (input) {
    winningPoint = input;
  } else {
    winningPoint = 100;
  }

  //WINNER CHECKING
  if (totalScore[activePlayer - 1] >= winningPoint) {
    //CHANGING UI
    document.getElementById(`header-${activePlayer}`).textContent = 'winner!';
    image1.style.display = 'none';
    image2.style.display = 'none';
    document.querySelector(`.player-${activePlayer}`).classList.add('winner');
    document
      .querySelector(`.player-${activePlayer}`)
      .classList.remove('active');

    //REMOVING ALL THE EVENT LISTENERS
    document.getElementById('roll').removeEventListener('click', rolldice);
    document
      .getElementById('hold')
      .removeEventListener('click', displayTotalScore);
  } else {
    //NEXT PLAYER TURN
    nextPlayer();
  }
}

//INITIALIZING THE GAME USING NEW BUTTON
document.getElementById('new').addEventListener('click', init);
