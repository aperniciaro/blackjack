const main = () => {}

// array with ranks
// array with suits
// array for deck
// array for dealer hand
// array for player hand
let ranks = [
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  '10',
  'jack',
  'queen',
  'king',
  'ace'
]
let suits = ['clubs', 'diamonds', 'hearts', 'spades']
let deck = []
let dealerHand = []
let player1Hand = []

const buildDeck = () => {
  for (let i = 0; i < ranks.length; i++) {
    for (let j = 0; j < suits.length; j++) {
      const card = {
        rank: ranks[i],
        suit: suits[j]
      }
      deck.push(card)
    }
  }
}

const shuffleDeck = () => {
  for (let i = deck.length - 1; i >= 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    const cardI = deck[i]
    const cardJ = deck[j]
    deck[i] = cardJ
    deck[j] = cardI
  }
}

const deal = whichHand => {
  const nextCard = deck.shift()
  const cardInHand = document.createElement('li')
  //change to images
  cardInHand.textContent = nextCard.rank + ' of ' + nextCard.suit
  document.querySelector(whichHand + '-hand').appendChild(cardInHand)
  //will need to change class if dealer
}

const reset = () => {
  buildDeck()
  shuffleDeck()
  for (let index = 0; index < 2; index++) {
    deal('dealer')
    deal('player')
  }
}

const hit = () => {}

const stand = () => {}

// build deck function
//   nested loop parsing rank and suit arrays
//     card object added to deck
//       rank property
//       suit property
//       img property
//   parse deck to assign values for numbers, face cards, aces with if/else
// shuffle deck function
//   loop exchanging elements of deck for random positions
// deal function, player/dealer as input
//   remove first element of deck
//   add element to specified hand
//   display element in specified list
//    assign card colors
// reset function
//   call build
//   call shuffle
//   deal dealer twice
//     apply hidden class
//   deal player twice
// hit function
//   deal player once
//   check for bust
// stand function
//   show dealer hand
//   deal dealer until 17
//   evaluate winner

document.addEventListener('DOMContentLoaded', reset)
document.querySelector('.hit-button').addEventListener('click', hit)
document.querySelector('.stand-button').addEventListener('click', stand)
document.querySelector('.reset-button').addEventListener('click', reset)
