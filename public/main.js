import { builtinModules } from 'module'
import { SSL_OP_ALLOW_UNSAFE_LEGACY_RENEGOTIATION } from 'constants'

const main = () => {}

// array with ranks
// array with suits
// array for deck
// array for dealer hand
// array for player hand

// build deck function
//   loop parsing rank and suit arrays
//     card object added to deck
//       rank property
//       suit property
//       value property
//         if else statements for numbers, face cards, aces
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

document.addEventListener('DOMContentLoaded', main)
