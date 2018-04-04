const interface = require('./modules/interface.js'),
    commands = require('./modules/commands.js'),
    Game = require('./modules/Game.js'),
    diffRanges = require('./modules/diff.js'),
    difficulty = process.argv[2] ? process.argv[2] : 'easy'

console.log(`You have started SNOWEDGE on ${difficulty} difficulty.`)
console.log('Type `guide` to see the instructions')

let gameSettings = diffRanges[difficulty],
    game = new Game(gameSettings)

game.genMap()
game.genDangers()

interface.on('line', (line) => {
    const availableCommands = Object.keys(commands),
            givenInitialCommand = line.charAt(0)

    if(!availableCommands.includes(givenInitialCommand))
        console.log('Command not found')

    for (let value of availableCommands) {
        let command = value
        if (command === givenInitialCommand) commands[command](game, line)
    }
})
