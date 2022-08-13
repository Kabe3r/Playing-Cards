const message = document.querySelector('.message');
const scored = document.querySelector('.score');
const btns = document.querySelectorAll('button');
const gamePlay =  document.querySelector('.gamePlay');
const highScored = document.querySelector('.high-score');

let prevCardVal = 0;
let score = 0;
let deck = [];
const ranks = [2,3,4,5,6,7,8,9,10,"J","Q","K","A"];
const suits = ["hearts", "diams", "clubs", "spades"];

btns.forEach(function(btn) {
      btn.addEventListener('click', playGame);
});

// Selecting btns and toggling their classes
function toggleBtns() {
      btns.forEach(function(btn) {
            btn.classList.toggle('hideButton');
      });
}

// Clicking the start btn to start the game and hide two btns
function playGame(e) {
      let temp = e.target.innerText;
      let currCard = drawCard();
      let prevScore = highScored.innerHTML;
      let currScore = score;
      // btn.innerText == Start then start the game run the respective functions
      if (temp == 'START') {
            message.innerHTML = 'Higher or Lower';
            gamePlay.innerHTML = '';
            score = 0;
            makeCard(currCard);-
            toggleBtns();
            return;
      }
      if (currScore > prevScore) {
            highScored.innerHTML = currScore;
      } else {
            highScored.innerHTML = prevScore;
      }
      
      if (currCard.value == prevCardVal) {
            message.innerHTML = 'Draw';
            message.style.color = '#2a9d8f';
      } else {
            if ((temp == 'HIGHER' && (currCard.value > prevCardVal)) || (temp == 'LOWER' && (currCard.value < prevCardVal))) {
                  score++;
                  scored.innerHTML = score;
                  message.innerHTML = "Correct, Next?";
                  message.style.color ="#3a86ff"
            } else {
                  message.innerHTML = "Wrong Game Over";
                  message.style.color = "#e63946";
                  toggleBtns();
            }
      }
      makeCard(currCard);
}

//getting random card obj one at a time by splicing the deck array. 
function drawCard() {
      if (deck.length > 0) {
            let randomInd = Math.floor(Math.random() * deck.length);
            let card = deck.splice(randomInd, 1)[0];
            return card;
      }
      else {
            makeDeck();
            return drawCard();
      }
}

// making the card with suits, ranks and values in obj and pushing into the deck array;
function makeDeck() {
      deck = [];
      for (let i = 0; i < suits.length; i++) {
            for (let j = 0; j < ranks.length; j++) {
                  let card = {};
                  card.suit = suits[i];
                  card.rank = ranks[j];
                  card.value = (j + 1);
                  deck.push(card);
            }
      }
}

function makeCard(card) {
 let rankSuit = card.rank + "<br>&"+card.suit+";";
 let rankSuit1 = "&"+card.suit+";" +"<br>"+card.rank;

 let currCards = document.querySelectorAll('.card');
 let div = document.createElement('div');
 div.setAttribute('class', 'card');
 div.style.left = (currCards.length * 25) + 'px';
 prevCardVal = card.value;
 if (card.suit === 'hearts' || card.suit === 'diams') {
      div.classList.add('red');
 }
 let span1 = document.createElement('span');
 span1.setAttribute('class', 'tiny-up');
 span1.innerHTML = rankSuit;
 div.appendChild(span1);

 let span2 = document.createElement('span');
 span2.setAttribute('class', 'big');
 span2.innerHTML = rankSuit;
 div.appendChild(span2);

 let span3 = document.createElement('span');
 span3.setAttribute('class', 'tiny-down');
 span3.innerHTML = rankSuit1;
 div.appendChild(span3);


 gamePlay.appendChild(div);
}