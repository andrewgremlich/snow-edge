const Player = require('./Player.js')

function Game(xDim, yDim, playerStartX, playerStartY, endGoalX, endGoalY, numDangers) {
    this.mapDisplay = []
    this.player = new Player(playerStartX, playerStartY, false, this)
    this.xDim = xDim
    this.yDim = yDim
    this.dangers = []
    this.endGoalX = endGoalX
    this.endGoalY = endGoalY
    this.numDangers = numDangers
}

/*
 *  SOMEHOW log how many dangers are nearby in a visited location.
 *  Have that show on the map!
 * */

Game.prototype.genMap = function() {
    let visLoc = this.player.visitedLocations
    this.mapDisplay = []

    for (let x = 0; x < this.xDim; x++) {
        this.mapDisplay.push([])
        for (let y = 0; y < this.yDim; y++) {
            this.mapDisplay[x].push('N')
        }
    }

    for (let z of visLoc) {
        let xLoc = z[0],
            yLoc = z[1]
        this.mapDisplay[xLoc][yLoc] = '*'
    }

    this.mapDisplay[this.player.xPos][this.player.yPos] = '&'
    this.mapDisplay[this.endGoalX][this.endGoalY] = '!!'
}

Game.prototype.genDangers = function() {

    const dangers = [
        'You fell off a cliff.',
        'You got eaten by a pack of wolves.',
        'You got got by a blizzard.',
        'You got mauled by a bear.',
        'You saw bigfoot???',
        'A penguin speared you with its beak.'
      ]
    
    let danger = 0,
        dangersGenerated = []

    while (danger <= this.numDangers) {
        let ranX = Math.floor(Math.random() * this.xDim) + 1,
            ranY = Math.floor(Math.random() * this.yDim) + 1,
            ranDanger = Math.floor(Math.random() * dangers.length)
            exists = false
        
        for (let dan of dangersGenerated) {
            if (dan[0] === ranX && dan[0] === ranY) 
                exists = true
        }

        if (!exists) { 
            this.dangers.push({
                dangerCoor: [ranX, ranY],
                danger: dangers[ranDanger]
            })
            danger++
        }
    }

    console.log(this.dangers)
    
    this.player.inDanger()
}

module.exports = Game
