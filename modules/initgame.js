let dataHandler = require('dataHandler.js')

function initgame() {
    let mapArray = []

    for (let i = 0; i < 10; i++) {
        mapArray.push([])
        for (let j = 0; j < 10; j++) {
            mapArray[i].push('N')
        }
    }

    return mapArray
}

module.exports = initgame
