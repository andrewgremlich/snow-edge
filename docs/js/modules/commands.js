const emoji = require('node-emoji')
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
    console.log('Invalid coordinates')
    console.log('Must be two numbers')
    return false
  }
  if (x < 1 || y < 1 || x > game.xLength || y > game.yLength) {
    console.log(emoji.get('confused'), ' What?')
    console.log('Must be valid x and y coordinates')
    console.log(`Must input coordinates (1,1) to (${ game.xLength },${ game.yLength })`)
    return false
  }

  return [x, y]
}

function h(game, command) {

  console.log('\x1b[34m')
  console.log('Hiking mountain...')
  console.log('\x1b[0m')

  let coordinates = validateCoordinates(game, command)
  if (coordinates) game.player.move(+coordinates[0], +coordinates[1])
  m(game)
}

function s(game, command) {
  console.log('Marking suspected danger on map...')
  let coordinates = validateCoordinates(game, command)
  if (coordinates) game.suspectedDangers.push(coordinates)
  m(game)
}

function l(game) {
  console.log(`

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
  console.log(`

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
    return console.log('Map is disabled on ludicrous difficulty.')

  game.genMap()

  let mapOutString = ''
  for (let row of game.mapDisplay) {
    for (let columnData of row) {
      mapOutString += columnData + '\t'
    }
    mapOutString += '\n'
  }
  process.stdout.write(mapOutString)
}

function c(game) {
  console.log(`${commands}`)
}

function r(game) {
  let playerData = game.player,
    isAre = playerData.dangersNear === 1 ? 'is' : 'are',
    dangerOrS = playerData.dangersNear === 1 ? 'danger' : 'dangers'

  console.log('\x1b[31m')
  console.log(`There ${ isAre } ${ playerData.dangersNear } ${ dangerOrS } near by.  Be careful!`)
  console.log('\x1b[0m')
}

function r(game) {
  let playerData = game.player,
    isAre = playerData.dangersNear === 1 ? 'is' : 'are',
    dangerOrS = playerData.dangersNear === 1 ? 'danger' : 'dangers'

  console.log('\x1b[31m')
  console.log(`There ${ isAre } ${ playerData.dangersNear } ${ dangerOrS } near by.  Be careful!`)
  console.log('\x1b[0m')
}

module.exports = {
  r,
  s,
  g,
  c,
  h,
  l,
  m
}
