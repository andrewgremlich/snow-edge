const interface = require('./modules/interface.js'),
    commands = require('./modules/commands.js'),
    Game = require('./modules/Game.js')

console.log('You have started SNOWEDGE')
console.log('Type `begin` when you want to play')

/*
 *  Params (yLength, xLength, yPlayerStart, xPlayerStart, yGoal, xGoal, numDangers)
 *
 *  I should DEFINTELY double check these numbers if they coorrespond with what is there.
 *
 *  Add feature to not have these numbers be magic but have them range by desired inputted difficulty.
 *  So for example (node index.js easy OR node index.js medium OR node index.js hard)
 * */
let game = new Game(10, 10, 0, 0, 8, 8, 12)

game.genMap()
game.genDangers()

interface.on('line', (line) => {
    const availableCommands = Object.keys(commands)

    for (let value of availableCommands) {
        let command = value,
            givenInitialCommand = line.charAt(0)
        if (command === givenInitialCommand) commands[command](game, line)
    }
})
