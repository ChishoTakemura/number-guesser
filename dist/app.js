//Game Values
let min = 1,
  max = 10,
  winningNum = getRandomNum(min, max),
  guessesLeft = 3;

//UI Elements
const game = document.querySelector('#game'),
  minNum = document.querySelector('.min-num'),
  maxNum = document.querySelector('.max-num'),
  guessBtn = document.querySelector('#guess-btn'),
  guessInput = document.querySelector('#guess-input'),
  message = document.querySelector('.message');

//Assign UI min and max
minNum.textContent = min;
maxNum.textContent = max;

//play again event listener
game.addEventListener('mousedown', function(e) {
  console.log('OUTPUT: game', game);
  if (e.target.className === 'play-again') {
    window.location.reload();
  }
});

//Listen for guess
guessBtn.addEventListener('click', function() {
  let guess = parseInt(guessInput.value);
  //Validate
  if (isNaN(guess) || guess < min || guess > max) {
    setMessage(`Please enter a number between ${min} and ${max}`, 'red');
  }

  //check if won
  if (guess === winningNum) {
    //Game over won
    gameOver(true, `${winningNum} is correct, YOU WIN!`, 'green');
    // //disable input
    // guessInput.disabled = true;
    // //change border color
    // guessInput.style.borderColor = 'green';
    // //Set message
    // setMessage(`${winningNum} is correct, YOU WIN!`, 'green');
  } else {
    //Wrong number
    guessesLeft -= 1;

    if (guessesLeft < 1) {
      //Game over - lost
      gameOver(true, 'red');
      guessInput.disabled = true;
      //change border color
      guessInput.style.borderColor = 'red';
      //Set message
      setMessage(
        `Game Over, you lost The correct Number was${winningNum}`,
        'red'
      );
    } else {
      //game continues - answer wrong

      //change border color
      guessInput.style.borderColor = 'red';

      //clear input
      guessInput.value = '';

      //Tell user its the wrong number
      setMessage(
        `${guess} is not correct, you have ${guessesLeft} guesses left`
      );
    }
  }
});

//Game over
function gameOver(won, msg) {
  let color;
  won === true ? (color = 'green') : (color = 'red');
  //disable input
  guessInput.disabled = true;
  //change border color
  guessInput.style.borderColor = 'green';
  //set text color
  message.style.color = color;
  //Set message
  setMessage(msg);
  //play again
  guessBtn.value = 'Play Again';
  guessBtn.className += 'play-again';
}

//set message
function setMessage(msg, color) {
  message.style.color = color;
  message.textContent = msg;
}

//get winning NUM
function getRandomNum(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
