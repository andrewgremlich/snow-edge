const interface = require('./modules/interface.js'),
    commands = require('./modules/commands.js'),
    Game = require('./modules/Game.js'),
    difficulty = process.argv[2] ? process.argv[2] : 'easy',
    diffRanges = {
        easy: {
            yLength: 10,
            xLength: 10,
            yPlayerStart: 0,
            xPlayerStart: 0,
            yGoal: 8,
            xGoal: 8,
            numDangers: 12
        },
        medium: {
            yLength: 12,
            xLength: 12,
            yPlayerStart: 1,
            xPlayerStart: 1,
            yGoal: 10,
            xGoal: 10,
            numDangers: 20
        },
        hard: {
            yLength: 14,
            xLength: 14,
            yPlayerStart: 2,
            xPlayerStart: 2,
            yGoal: 12,
            xGoal: 12,
            numDangers: 30
        }
    }

//for HARD diff make now map output?
//the coordinate grid and locations are messed up.  clean it to make sense!

console.log(`You have started SNOWEDGE on ${difficulty} difficulty.`)
console.log('Type `guide` to see the instructions')

let diff = diffRanges[difficulty],
    game = new Game(diff.yLength, diff.xLength, diff.yPlayerStart, diff.xPlayerStart, diff.yGoal, diff.xGoal, diff.numDangers)

game.genMap()
game.genDangers()

interface.on('line', (line) => {
    const availableCommands = Object.keys(commands),
            givenInitialCommand = line.charAt(0)

    for (let value of availableCommands) {
        let command = value
        if (command === givenInitialCommand) commands[command](game, line)
    }
})
