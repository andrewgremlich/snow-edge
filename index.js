const interface = require('./modules/interface.js'),
      commands = require('./modules/commands.js')

interface.on('line', (line) => {
    const availableCommands = Object.keys(commands)

    let mapArray = []

    for (let i = 0; i < 10; i++) {
        mapArray.push([])
        for (let j = 0; j < 10; j++) {
            mapArray[i].push('N')
        }
    }

    for (let value of availableCommands) {
        if (value === line) commands[line](mapArray)
    }
})
