import outputToScreen from './outputToScreen.js'
import emoji from '../ext/emoji.js'

//CHANGE DIFFICULTY IN COMMANDS
//difficulty = process.argv[2] ? process.argv[2] : 'easy'

const commands = `
Available commands.
***Basic Commands
[g]    Show guide
[m]    Show Map
[h]    Hike Mountain (example command 'h 2 2')

***Utility Commands
[s]    Mark suspected danger
[r]    Remind nearby dangers

***Help Commands
[c]    Show commands again
[l]    Show Legend
`

function validateCoordinates(game, command) {
  const numCheck = /\d+/g,
    coordinates = command.match(numCheck),
    y = +coordinates[1],
    x = +coordinates[0]

  if (!numCheck.test(command) || coordinates.length !== 2) {
    outputToScreen('Invalid coordinates')
    outputToScreen('Must be two numbers')
    return false
  }
  if (x < 1 || y < 1 || x > game.xLength || y > game.yLength) {
    outputToScreen(emoji['confused'])
    outputToScreen('Must be valid x and y coordinates')
    outputToScreen(`Must input coordinates (1,1) to (${ game.xLength },${ game.yLength })`)
    return false
  }

  return [x, y]
}

function h(game, command) {

  // outputToScreen('\x1b[34m')
  outputToScreen('Hiking mountain...')
  // outputToScreen('\x1b[0m')

  let coordinates = validateCoordinates(game, command)
  if (coordinates) game.player.move(+coordinates[0], +coordinates[1])
  m(game)
}

function s(game, command) {
  outputToScreen('Marking suspected danger on map...')
  let coordinates = validateCoordinates(game, command)
  if (coordinates) game.suspectedDangers.push(coordinates)
  m(game)
}

function l(game) {
  outputToScreen(`

/*****   MAP LEGEND   *****/

* '&'     Player Icon
* 'N'     Unknown location
* '*'     Visited location with no danger.
* 'X'     Visited location with known danger.
* '?'     Location with suspected danger.

* Nearby dangers appear as a number
    * i.e. '1' or '2'.
            `)
}

function g(game) {
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
}

function m(game) {

  if (game.difficulty === 'ludicrous')
    return outputToScreen('Map is disabled on ludicrous difficulty.')

  game.genMap()

  let mapOutString = ''
  for (let row of game.mapDisplay) {
    for (let columnData of row) {
      mapOutString += columnData + '\t'
    }
    mapOutString += '\n'
  }
  outputToScreen(mapOutString)
}

function c(game) {
  outputToScreen(`${commands}`)
}

function r(game) {
  let playerData = game.player,
    isAre = playerData.dangersNear === 1 ? 'is' : 'are',
    dangerOrS = playerData.dangersNear === 1 ? 'danger' : 'dangers'

  // outputToScreen('\x1b[31m')
  outputToScreen(`There ${ isAre } ${ playerData.dangersNear } ${ dangerOrS } near by.  Be careful!`)
  // outputToScreen('\x1b[0m')
}

function r(game) {
  let playerData = game.player,
    isAre = playerData.dangersNear === 1 ? 'is' : 'are',
    dangerOrS = playerData.dangersNear === 1 ? 'danger' : 'dangers'

  // outputToScreen('\x1b[31m')
  outputToScreen(`There ${ isAre } ${ playerData.dangersNear } ${ dangerOrS } near by.  Be careful!`)
  // outputToScreen('\x1b[0m')
}

export default {
  r,
  s,
  g,
  c,
  h,
  l,
  m
}
