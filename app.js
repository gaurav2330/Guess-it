// Game values
let min = 1,
    max = 10,
    winningNum = getWinningNum(min,max),
    guessesLeft = 3;

// UI elements
const game = document.querySelector('#game'),
      minNum = document.querySelector('.min-num'),
      maxNum = document.querySelector('.max-num'),
      guessBtn = document.querySelector('#guess-btn'),
      guessInput = document.querySelector('#guess-input'),
      message = document.querySelector('.message');

//  Assign min and max
minNum.textContent = min;
maxNum.textContent = max;

// play again
game.addEventListener('mousedown',function(e){
    if(e.target.className === 'play-again'){
        window.location.reload();
    }
})

// Listen for guess
guessBtn.addEventListener('click',function(){
    let guess = parseInt(guessInput.value);

    // validation
    if(isNaN(guess) || guess < min || guess > max){
        setMessage(`Please call a number between ${min} and ${max}`,'red');
    }

    // check if won
    if(guess === winningNum){
    // Game over - won
        gameOver(true,`${winningNum} is correct. YOU WIN!`);
    }
    else{
        guessesLeft-=1;
    // check if guesses left
        if(guessesLeft === 0){
            // Game over - lost
           gameOver(false,`Game over, you lost. The winning number was ${winningNum}.`);
        }
        else{
            // Game continues
            guessInput.style.borderColor = 'red';
            guessInput.value = '';
            setMessage(`Oops! Wrong answer. ${guessesLeft} guesses left!`,'red');
        }
        //guessInput.style.borderColor = 'red';

    }
})

// game over function
function gameOver(won,msg){
        let color;
        won === true ? color = 'green' : color = 'red';

        guessInput.disabled = true;
        guessInput.style.borderColor = color;
        setMessage(msg,color);

        // Play again
        guessBtn.value = 'Play Again!';
        guessBtn.className += 'play-again';
}

// setmessage function
function setMessage(msg, color){
    message.style.color = color;
    message.textContent = msg;
}

// Get winning number
function getWinningNum(min,max){
    return Math.floor(Math.random()*(max-min+1)+min);
}