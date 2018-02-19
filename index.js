const interface = require('./modules/interface.js'),
    commands = require('./modules/commands.js'),
    initgame = require('./modules/initgame.js')

console.log('You have started SNOWEDGE')
console.log('Type `begin` when you want to play')

interface.on('line', (line) => {
    const availableCommands = Object.keys(commands)

    let mapArray = initgame()

    for (let value of availableCommands) {
        if (value === line) commands[line](mapArray)
    }
})
