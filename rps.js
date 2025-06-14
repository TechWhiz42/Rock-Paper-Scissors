// Initialize score from localStorage or default to 0s
const score = JSON.parse(localStorage.getItem('score')) || {
  wins: 0,
  losses: 0,
  ties: 0
};

updateScoreDisplay();

// Updates score display in the UI
function updateScoreDisplay() {
  document.querySelector('.js-score').innerHTML =
    `Wins: ${score.wins}. Losses: ${score.losses}. Ties: ${score.ties}`;
}

// Returns a random move for the computer
function getComputerMove() {
  const randomNumber = Math.random();
  if (randomNumber < 1 / 3) return 'Rock';
  else if (randomNumber < 2 / 3) return 'Paper';
  return 'Scissors';
}

// Determines the result
function getResult(playerMove, computerMove) {
  if (playerMove === computerMove) return 'Tie';

  const winConditions = {
    Rock: 'Scissors',
    Paper: 'Rock',
    Scissors: 'Paper'
  };

  return winConditions[playerMove] === computerMove ? 'You win' : 'You lose';
}

// Handle a single round
function playGame(playerMove) {
  const computerMove = getComputerMove();
  const result = getResult(playerMove, computerMove);

  if (result === 'You win') score.wins++;
  else if (result === 'You lose') score.losses++;
  else score.ties++;

  localStorage.setItem('score', JSON.stringify(score));
  updateScoreDisplay();

  document.querySelector('.js-show-result').innerHTML = result;
  document.querySelector('.js-result').innerHTML = `
    You 
    <img src="Images/${playerMove}-emoji.png" class="move-icon">
    <img src="Images/${computerMove}-emoji.png" class="move-icon">
    Computer.`;
}

// Button event listeners
document.querySelector('.js-rock-button')
  .addEventListener('click', () => playGame('Rock'));

document.querySelector('.js-paper-button')
  .addEventListener('click', () => playGame('Paper'));

document.querySelector('.js-scissors-button')
  .addEventListener('click', () => playGame('Scissors'));

document.querySelector('.js-reset-button')
  .addEventListener('click', () => newGame());

document.querySelector('.js-auto-play-button')
  .addEventListener('click', () => autoPlay());

// Autoplay toggle
let isAutoPlaying = false;
let intervalId;

function autoPlay() {
  const button = document.querySelector('.js-auto-play-button');

  if (!isAutoPlaying) {
    button.innerHTML = 'Stop Play';
    intervalId = setInterval(() => {
      const playerMove = getComputerMove();
      playGame(playerMove);
    }, 1000);
  } else {
    clearInterval(intervalId);
    button.innerHTML = 'Auto Play';
  }

  isAutoPlaying = !isAutoPlaying;
}

// Resets game
function newGame() {

  const rpsHtml = document.querySelector('.js-confirmation-modal');
  rpsHtml.innerHTML = `Are you sure you want to reset?
  <button class = "js-confirm-yes">Yes</button>
  <button class = "js-confirm-no">No</button>`

  document.querySelector('.js-confirm-yes')
  .addEventListener('click', () =>{
    score.wins = 0;
    score.losses = 0;
    score.ties = 0;

    localStorage.setItem('score', JSON.stringify(score));
    updateScoreDisplay();
    document.querySelector('.js-result').innerHTML = 'Play Again';
    document.querySelector('.js-show-result').innerHTML = '';
    document.querySelector('.js-confirmation-modal')
    .innerHTML='';
  })

  document.querySelector('.js-confirm-no')
  .addEventListener('click', ()=>{
    document.querySelector('.js-confirmation-modal')
    .innerHTML='';
  })
  

 
}
 if (isAutoPlaying) {
    clearInterval(intervalId);
    isAutoPlaying = false;
    document.querySelector('.js-auto-play-button').innerHTML = 'Auto Play';
}

// Keyboard shortcuts
document.body.addEventListener('keydown', (event) => {
  const key = event.key.toLowerCase();
  if (key === 'r') playGame('Rock');
  else if (key === 'p') playGame('Paper');
  else if (key === 's') playGame('Scissors');
  else if (key === 'a') autoPlay();
  else if (key === 'x') newGame();
});
