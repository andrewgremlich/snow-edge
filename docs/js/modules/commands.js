import outputToScreen from './outputToScreen.js'
import initGame from './InitGame.js'

const commands = `
Available commands.
***Basic Commands
[m]    Show Map
[h]    Hike Mountain (example command 'h 2 2')
[s]    Mark suspected danger
[r]    Remind nearby dangers
[p]    Show current position

***Help Commands
[g]    Show guide
[c]    Show commands again
[l]    Show Legend
[d]    Change difficulty
`

function validateCoordinates(command) {
  const numCheck = /\d+/g,
    coordinates = command.match(numCheck),
    y = +coordinates[1],
    x = +coordinates[0]

  if (!numCheck.test(command) || coordinates.length !== 2) {
    outputToScreen('Invalid coordinates')
    outputToScreen('Must be two numbers')
    return false
  }
  if (x < 1 || y < 1 || x > playGame.xLength || y > playGame.yLength) {
    outputToScreen('😕')
    outputToScreen('Must be valid x and y coordinates')
    outputToScreen(`Must input coordinates (1,1) to (${ playGame.xLength },${ playGame.yLength })`)
    return false
  }

  return [x, y]
}

export default {

  p() {
    const playerData = window.playGame.player

    outputToScreen(`Your current position is (${ playerData.yPos + 1 },${ playerData.xPos + 1 })`)
  },

  d(line) {
    const commandIs = line.split(' '),
      difficultySettings = ['easy', 'medium', 'hard', 'ludicrous']

    if (commandIs.length !== 2 || !difficultySettings.includes(commandIs[1])) {
      outputToScreen('Invalid command.')
      return
    }
    initGame(commandIs[1])
    outputToScreen('Game difficulty changed!')
  },

  r() {
    let playerData = playGame.player,
      isAre = playerData.dangersNear === 1 ? 'is' : 'are',
      dangerOrS = playerData.dangersNear === 1 ? 'danger' : 'dangers',
      careful = playerData.dangersNear === 0 ? '': 'Be careful!'

    outputToScreen(`There ${ isAre } ${ playerData.dangersNear } ${ dangerOrS } near by.  ${ careful }`)
  },

  s(command) {
    outputToScreen('Marking suspected danger on map...')
    let coordinates = validateCoordinates(command)
    if (coordinates) playGame.suspectedDangers.push(coordinates)
    this.m()
  },

  g() {
    outputToScreen(`

  /*********************************************/
        Welcome to SnowEdge!
  /*********************************************/

  You are a daring explorer.  You decided to scale
  Mount Denali in a snow storm!  You find your way
  to the top, but be careful!  There are dangers
  along the way.  You will recieve cues on your
  map when you are near danger, but you must make
  the right choice where to go!

  Be careful on this great adventurous endeavor!

  The map is a 10 x 10 grid, with (0,0) starting
  in the top left corner.

  ${commands}
                  `)
  },

  c() {
    outputToScreen(`${commands}`)
  },

  h(command) {
    outputToScreen('Hiking mountain...')
    let coordinates = validateCoordinates(command)
    if (coordinates) playGame.player.move(+coordinates[0], +coordinates[1])
    this.m()
  },

  l() {
    outputToScreen(`

  /*****   MAP LEGEND   *****/

  * '&'     Player Icon
  * '.'     Unknown location
  * '*'     Visited location with no danger.
  * 'X'     Visited location with known danger.
  * '?'     Location with suspected danger.

  * Nearby dangers appear as a number
      * i.e. '1' or '2'.
              `)
  },

  m() {

    if (playGame.difficulty === 'ludicrous')
      return outputToScreen('Map is disabled on ludicrous difficulty.')

    playGame.genMap()

    let mapOutString = ''
    for (let row of playGame.mapDisplay) {
      for (let columnData of row) {
        mapOutString += columnData + '\t'
      }
      mapOutString += '\n'
    }

    outputToScreen(mapOutString)
    this.r()
  }

}
