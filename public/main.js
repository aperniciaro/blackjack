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
  'j',
  'q',
  'k',
  'a'
]
let suits = ['clubs', 'diamonds', 'hearts', 'spades']
let deck = []
let dealerHand = []
let playerHand = []
let playerTotal = 0
let dealerTotal = 0

const buildDeck = () => {
  for (let i = 0; i < suits.length; i++) {
    for (let j = 0; j < ranks.length; j++) {
      const card = {
        rank: ranks[j],
        suit: suits[i]
      }
        value: parseInt(ranks[i], 10)
      deck.push(card)
    }
  }
  for (let k = 0; k < deck.length; k++) {
    if(deck[k].rank == 'j' || deck[k].rank == 'q'|| deck[k].rank == 'k'){
      deck[k].value = 10
    }else if(deck[k].rank == 'a'){
      deck[k].value = 11
    }else{
      deck[k].value = parkseInt(deck[k].rank, 10)
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
  const targetHand = whichHand + 'Hand'
  targetHand.push(nextCard)
  const cardInHand = document.createElement('li')
  //change below to images
  cardInHand.textContent = nextCard.rank + nextCard.suit
  document.querySelector(whichHand + '-hand').appendChild(cardInHand)
}

const reset = () => {
  buildDeck()
  shuffleDeck()
  for (let index = 0; index < 2; index++) {
    deal('player')
  }
  playerSum()
  if(playerTotal == 21){
    //blackjack
  }
  dealerSum()
}

const playerSum = () =>{
  for (let i = 0; i < playerHand.length; i++) {
    playerTotal += playerHand[i].value
}

const dealerSum = () =>{
  for (let i = 0; i < dealerHand.length; i++) {
    dealerTotal += dealerHand[i].value
}

const hit = () => {
  deal('player')
  playerSum()
  if (playerTotal > 21) {
    //bust
    dealerWins() 
  } else if (playerTotal == 21) {
    //blackjack
  }
}

const stand = () => {
  for (let index = 0; index < 2; index++) {
    deal(dealer)
  }
  dealerSum()
  while(dealerTotal<17){
    deal('dealer')
    dealerSum()
  }
  if(dealerTotal == playerTotal){
    tie()
  }else if(dealerTotal > playerTotal && dealerTotal < 22){
    dealerWins()
  }else{
    playerWins()
  }
}

const dealerWins = () => {

}

const playerWins = () => {

}

const tie = () => {

}

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
