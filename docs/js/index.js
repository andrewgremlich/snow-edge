import commands from './modules/commands.js'
import InitGame from './modules/InitGame.js'
import outputToScreen from './modules/outputToScreen.js'

outputToScreen(`❄️❄️❄️❄️❄️❄️❄️❄️❄️❄️❄️❄️❄️❄️❄️❄️❄️❄️❄️❄️❄️❄️❄️`)
outputToScreen(`You have started SNOWEDGE on easy difficulty.`)
outputToScreen('Type `g` to see the instructions')

InitGame('easy')

playGame.genMap()
playGame.genDangers()

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
      if (command === givenInitialCommand) commands[command](line)
    }
  }
}
