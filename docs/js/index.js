import commands from './modules/commands.js'
import Game from './modules/Game.js'
import diffRanges from './modules/diff.js'
import outputToScreen from './modules/outputToScreen.js'
import emoji from './ext/emoji.js'

const difficulty = 'easy'

outputToScreen(emoji['snowflake'])

let inputer = document.querySelector('input[type="text"]'),
  blinkingCaret = document.querySelector('.blinking-caret')

outputToScreen(`You have started SNOWEDGE on ${difficulty} difficulty.`)
outputToScreen('Type `guide` to see the instructions')

let gameSettings = diffRanges[difficulty],
  game = new Game(gameSettings)

game.genMap()
game.genDangers()

document.onkeydown = e => {
  let enterKey = e.keyCode,
    activeElement = document.activeElement,
    inputBar = document.querySelector('input[type="text"]')

  if (enterKey === 13 && activeElement === inputBar) {
    const line = inputBar.value,
      availableCommands = Object.keys(commands),
      givenInitialCommand = line.charAt(0)

    if (!availableCommands.includes(givenInitialCommand))
      outputToScreen('Command not found')

    inputBar.value = ''

    for (let value of availableCommands) {
      let command = value
      if (command === givenInitialCommand) commands[command](game, line)
    }
  }
}
