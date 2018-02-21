const interface = require('./modules/interface.js'),
    commands = require('./modules/commands.js'),
    Game = require('./modules/Game.js')

console.log('You have started SNOWEDGE')
console.log('Type `begin` when you want to play')

let game = new Game(10, 10, 0, 0)

game.genMap()
game.genDangers()

interface.on('line', (line) => {
    const availableCommands = Object.keys(commands)
    
    console.log(game)

    for (let value of availableCommands) {
        if (value === line) commands[line](game.mapArray)
    }
})
