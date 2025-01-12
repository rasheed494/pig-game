'use strict';
//elements
const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');
const score0 = document.querySelector('#score--0');
const score1 = document.querySelector('#score--1');
const current0 = document.getElementById('current--0');
const current1 = document.getElementById('current--1');

const diceEL = document.querySelector('.dice');
const btnnew = document.querySelector('.btn--new');
const btnroll = document.querySelector('.btn--roll');
const btnhold = document.querySelector('.btn--hold');

let scores, currentScore, activePlayer, playing;
//condition
const init = function () {
  scores = [0, 0];
  current0.textContent = 0;
  current1.textContent = 0;

  score0.textContent = 0;
  score1.textContent = 0;
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  diceEL.classList.add('hidden');
  player0.classList.remove('player--winner');
  player1.classList.remove('player--winner');
  player0.classList.add('player--active');
  player1.classList.remove('player--active');
};
init();
function switchPlayer() {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  currentScore = 0;
  player0.classList.toggle('player--active');
  player1.classList.toggle('player--active');
}

//rolling dice

btnroll.addEventListener('click', function () {
  // Random Number
  if (playing == true) {
    const dice = Math.trunc(Math.random() * 6) + 1;
    console.log(dice, typeof dice);

    //display dice
    diceEL.classList.remove('hidden');
    diceEL.src = `dice-${dice}.png`;
    //if it not one

    if (dice !== 1) {
      //Add dice to current score
      currentScore = currentScore + dice;
      console.log(currentScore);
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
      //hold
    } else {
      //if it is one
      switchPlayer();
    }
  }
});
btnhold.addEventListener('click', function () {
  if (playing == true) {
    scores[activePlayer] += currentScore;

    //score
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    if (scores[activePlayer] >= 100) {
      playing = false;
      diceEL.classList.add('hidden');

      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('activePlayer');
    } else {
      switchPlayer();
    }
  }
});
btnnew.addEventListener('click', init);
