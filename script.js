'use strict';

//selecting elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.querySelector('#score--1');
const diceEl = document.querySelector('.dice');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const btnNew = document.querySelector('.btn--new');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

// Starting conditions
let scores,currentScore,activePlayer,playing;

const init =()=>{
    scores =[0,0];
    currentScore = 0;
    activePlayer = 0;
    score0El.textContent = 0;
    score1El.textContent = 0;
    current0El.textContent = 0;
    current1El.textContent = 0;
    playing=true;
    diceEl.classList.add('hidden');
    player0El.classList.remove('player--winner');
    player1El.classList.remove('player--winner');
    player0El.classList.add('player--active');
    player1El.classList.remove('player--active');
}

init();
const switchPlayer =()=>{
    document.getElementById(`current--${activePlayer}`).textContent =0;
    activePlayer = activePlayer ===0 ? 1:0;
    currentScore = 0;
    player0El.classList.toggle('player--active');
    player1El.classList.toggle('player--active');

}
//rolling dice functionality
btnRoll.addEventListener('click',function(){
   //1. generate random dice roll
   if(playing){
   let dice = Math.trunc(Math.random()*6)+1;
   console.log(dice);

   //2.display dice
   diceEl.classList.remove('hidden'); 
   diceEl.src = `dice-${dice}.png`;
   
   //3.check for rolled 1 if true then switch to next player
    if(dice!==1){
        currentScore+=dice;
        document.getElementById(`current--${activePlayer}`).textContent = currentScore;
        // current0El.textContent = currentScore; 
    }else{
      switchPlayer();
    }
    } 
});

btnHold.addEventListener('click',function(){
    console.log('click');
    if(playing){
    scores[activePlayer]+=currentScore;
    document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];
    console.log(currentScore);
    if(scores[activePlayer] >= 10){
        playing = false;
        diceEl.classList.add('hidden');
        document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
        document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
    }else{
        switchPlayer();
    }
    }
});

btnNew.addEventListener('click',init);