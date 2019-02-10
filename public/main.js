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
let playerHand = []
let playerTotal = 0
let dealerTotal = 0

const reset = () => {
  for (i = 0; i < playerHand.length; i++) {
    document.querySelecter('.player-hand').removeChild('player-hand'.firstChild)
  }
  for (k = 0; k < dealerHand.length; k++) {
    document.querySelecter('.dealer-hand').removeChild('dealer-hand'.firstChild)
  }
  playerHand = []
  dealerHand = []
  buildDeck()
  shuffleDeck()
  for (let j = 0; j < 2; j++) {
    dealPlayer()
  }
  if (playerTotal == 21) {
    let message = document.createElement('h2')
    message.textContent = 'Player has Blackjack!'
    document.querySelector('.events').appendChild(message)
  }
  document.getElementById('hit-button').disabled = false
  document.getElementById('stand-button').disabled = false
}

const buildDeck = () => {
  for (let i = 0; i < suits.length; i++) {
    for (let j = 0; j < ranks.length; j++) {
      const card = {
        rank: ranks[j],
        suit: suits[i],
        cardValue: 0
      }
      deck.push(card)
    }
  }
  for (let k = 0; k < deck.length; k++) {
    if (
      deck[k].rank == 'jack' ||
      deck[k].rank == 'queen' ||
      deck[k].rank == 'king'
    ) {
      deck[k].cardValue = 10
    } else if (deck[k].rank == 'ace') {
      deck[k].cardValue = 11
    } else {
      deck[k].cardValue = parseInt(deck[k].rank, 10)
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

const dealDealer = () => {
  const nextCard = deck.shift()
  dealerTotal += nextCard.cardValue
  const cardInHand = document.createElement('li')
  //change below to images
  cardInHand.textContent = nextCard.rank + nextCard.suit
  document.querySelector('.dealer-hand').appendChild(cardInHand)
}

const dealPlayer = () => {
  const nextCard = deck.shift()
  playerTotal += nextCard.cardValue
  const cardInHand = document.createElement('li')
  //change below to images
  cardInHand.textContent = nextCard.rank + nextCard.suit
  document.querySelector('.player-hand').appendChild(cardInHand)
}

const hit = () => {
  dealPlayer()
  if (playerTotal > 21) {
    let message = document.createElement('h2')
    message.textContent = 'Player busts'
    document.querySelector('.events').appendChild(message)
    dealerWins()
  } else if (playerTotal == 21) {
    let message = document.createElement('h2')
    message.textContent = 'Player has 21!'
    document.querySelector('.events').appendChild(message)
  }
}

const stand = () => {
  for (let index = 0; index < 2; index++) {
    dealDealer()
  }
  while (dealerTotal < 17) {
    dealDealer()
  }
  if (dealerTotal == playerTotal) {
    tie()
  } else if (dealerTotal > 21) {
    let message = document.createElement('h2')
    message.textContent = 'Dealer busts'
    document.querySelector('.events').appendChild(message)
    playerWins()
  } else if (dealerTotal > playerTotal) {
    dealerWins()
  } else {
    playerWins()
  }
}

const dealerWins = () => {
  let message = document.createElement('h2')
  message.textContent = 'Dealer wins'
  document.querySelector('.events').appendChild(message)
  document.getElementById('hit-button').disabled = true
  document.getElementById('stand-button').disabled = true
}

const playerWins = () => {
  let message = document.createElement('h2')
  message.textContent = 'Player wins!'
  document.querySelector('.events').appendChild(message)
  document.getElementById('hit-button').disabled = true
  document.getElementById('stand-button').disabled = true
}

const tie = () => {
  let message = document.createElement('h2')
  message.textContent = 'Tie'
  document.querySelector('.events').appendChild(message)
  document.getElementById('hit-button').disabled = true
  document.getElementById('stand-button').disabled = true
}

document.addEventListener('DOMContentLoaded', reset)
document.querySelector('#hit-button').addEventListener('click', hit)
document.querySelector('#stand-button').addEventListener('click', stand)
document.querySelector('#reset-button').addEventListener('click', reset)
