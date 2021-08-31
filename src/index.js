const regeneratorRuntime = require("regenerator-runtime");

import Hangman from "./hangman"
import getPuzzle from "./requests"

const puzzleEl = document.querySelector('#puzzle')
const statusMessage = document.querySelector('#guesses')
let  game

window.addEventListener('keypress', (e) => {
    const letter = String.fromCharCode(e.charCode)
    game.guess(letter)
    render()
})

const render = () => {
    puzzleEl.innerHTML = ''
    game.puzzle.split('').forEach((letter) => {
        const letterEl = document.createElement('span')
        letterEl.textContent = letter
        puzzleEl.appendChild(letterEl)
    })
    statusMessage.textContent = game.statusMessage
}

const startGame = async () =>{
    const stickMan = document.querySelectorAll('[id^="svg_"]')
    stickMan.forEach((stick) => {
        stick.style.visibility = 'hidden'
    })
    document.querySelector('#YouWin').style.visibility = 'hidden'
    const puzzlea = await getPuzzle('3')
    game = new Hangman(puzzlea, 7)
    render()
}

document.querySelector('#reset').addEventListener('click', startGame)
startGame()