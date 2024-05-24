'use strict';

// Selecting elements
const score0EL = document.getElementById('score--1'); // Total score player 1
const score1EL = document.getElementById('score--2'); // Total score player 2
const current0EL = document.getElementById('current--1'); // Current score player 1
const current1EL = document.getElementById('current--2'); // Current score player 2

//Buttons:
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

// Dice:
const diceEl = document.querySelector('.dice');

///Functions:
// Initial conditions
let scores, currentScore, activePlayer, playing;

const init = function () {
  scores = [0, 0, 0];
  currentScore = 0; // initial current score player 1 & 2 en 0.
  activePlayer = 1;
  playing = true;

  diceEl.classList.add('hidden'); // Hide the dice

  // Current score html element and both total scores to zero
  for (let i = 1; i < 3; i++) {
    document.getElementById(`current--${i}`).textContent = currentScore; // Current score html element
    scores[i] = currentScore; // Total score variable
    document.getElementById(`score--${i}`).textContent = currentScore; // Total score html element
  }

  //Set the colors: player 1 as active and 2 as inactive and remove the winner for both.
  document.querySelector(`.player--1`).classList.add('player--active');
  document.querySelector(`.player--2`).classList.remove('player--active');

  // Adds the class player--nonActive to the one that isn´t and removes it from the player that is.
  document.querySelector(`.player--2`).classList.add('player--nonActive');
  document.querySelector(`.player--1`).classList.remove('player--nonActive');

  document.querySelector(`.player--1`).classList.remove('player--winner');
  document.querySelector(`.player--2`).classList.remove('player--winner');
};
init();

//Switch player:
const switchPlayer = function () {
  //The variable and the HTML element currentScore return to zero:
  currentScore = 0;
  document.getElementById(`current--${activePlayer}`).textContent =
    currentScore;

  // Remove the light color of the former active player
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.remove('player--active');

  // Adds the class "player--nonActive" to the former active player.
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.add('player--nonActive');

  activePlayer = activePlayer === 1 ? 2 : 1; // Switch the active player

  // add the light color to the new active player
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.add('player--active');

  // Removes the class "player--nonActive" to the former active player.
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.remove('player--nonActive');
};

///Event listeners:
// Button - Roll dice
btnRoll.addEventListener('click', function () {
  if (playing) {
    //Roll of the dice - show of the diceElement with the number of the dice.
    const dice = Math.trunc(Math.random() * 6 + 1);
    diceEl.setAttribute('src', `dice-${dice}.png`);
    diceEl.classList.remove('hidden');

    // if the dice is not one, the dice is added to the currentScore:
    if (dice !== 1) {
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      // If no player has 100, switch player:
      switchPlayer();
    }
  }
});

// Button - hold
btnHold.addEventListener('click', function () {
  if (playing) {
    // Add current score to the total of each player in its variable and the HTML element
    scores[activePlayer] = scores[activePlayer] + currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    if (scores[activePlayer] >= 20) {
      //If a player gets to 100 wins
      //its backgorund turns black:
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');

      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      //Remove the dice
      diceEl.classList.add('hidden');
      // the current score goes back to zero
      currentScore = 0;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
      // the gane stops:
      playing = false;
    } else {
      // If no player has 100, switch player:
      switchPlayer();
    }
  }
});

btnNew.addEventListener('click', init);
