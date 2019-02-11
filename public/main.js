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
let winner = ''

const reset = () => {
  //children not removing
  while ('.player-hand'.firstChild) {
    document.querySelector('.player-hand').removeChild('player-hand'.firstChild)
  }
  while ('.dealer-hand'.firstChild) {
    document.querySelector('.dealer-hand').removeChild('dealer-hand'.firstChild)
  }
  while ('.events'.firstChild) {
    document.querySelector('.events').removeChild('events'.firstChild)
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
        suit: suits[i],
        rank: ranks[j],
        cardValue: 0,
        cardImage: ''
      }
      deck.push(card)
    }
  }
  for (let k = 0; k < deck.length; k++) {
    deck[k].cardImage =
      '/images/' + deck[k].rank + '_of_' + deck[k].suit + '.svg'
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

const dealPlayer = () => {
  const playerCard = deck.shift()
  playerTotal += playerCard.cardValue
  let playerCardPic = document.createElement('img')
  document.querySelector('.player-hand').appendChild(playerCardPic)
  playerCardPic.src = playerCard.cardImage
}

const dealDealer = () => {
  const dealerCard = deck.shift()
  dealerTotal += dealerCard.cardValue
  let dealerCardPic = document.createElement('img')
  document.querySelector('.dealer-hand').appendChild(dealerCardPic)
  dealerCardPic.src = dealerCard.cardImage
}

const hit = () => {
  dealPlayer()
  if (playerTotal > 21) {
    let message = document.createElement('h2')
    message.textContent = 'Player busts'
    document.querySelector('.events').appendChild(message)
    victory('Dealer')
  } else if (playerTotal == 21) {
    let message = document.createElement('h2')
    message.textContent = 'Player has 21!'
    document.querySelector('.events').appendChild(message)
  }
}

const stand = () => {
  //children not removing
  while ('.dealer-hand'.firstChild) {
    document.querySelector('.dealer-hand').removeChild('dealer-hand'.firstChild)
  }
  for (let index = 0; index < 2; index++) {
    dealDealer()
  }
  while (dealerTotal < 17) {
    dealDealer()
  }
  if (dealerTotal == playerTotal) {
    victory('tie')
  } else if (dealerTotal > 21) {
    let message = document.createElement('h2')
    message.textContent = 'Dealer busts'
    document.querySelector('.events').appendChild(message)
    victory('Player')
  } else if (dealerTotal > playerTotal) {
    victory('Dealer')
  } else {
    victory('Player')
  }
}

const victory = winner => {
  if (winner == 'tie') {
    document.querySelector('.events').removeChild('events'.firstChild)
    let winMessage = document.createElement('h2')
    document.querySelector('.events').appendChild(winMessage)
    winMessage.textContent = 'Tie'
  } else {
    document.querySelector('.events').removeChild('events'.firstChild)
    let winMessage = document.createElement('h2')
    document.querySelector('.events').appendChild(winMessage)
    winMessage.textContent = winner + ' wins'
  }
  document.getElementById('hit-button').disabled = true
  document.getElementById('stand-button').disabled = true
}

document.addEventListener('DOMContentLoaded', reset)
document.querySelector('#hit-button').addEventListener('click', hit)
document.querySelector('#stand-button').addEventListener('click', stand)
document.querySelector('#reset-button').addEventListener('click', reset)
