const Player = require('./Player.js')

function Game(xDim, yDim, playerStartX, playerStartY) {
    this.mapDisplay = []
    this.player = new Player(playerStartX, playerStartY, false, this)
    this.xDim = xDim
    this.yDim = yDim
    this.dangers = []
}

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
}

Game.prototype.genDangers = function() {
    let numDangers = 12,
        danger = 0

    while (danger <= 12) {
        let ranX = Math.floor(Math.random() * this.xDim) + 1,
            ranY = Math.floor(Math.random() * this.yDim) + 1
        this.dangers.push([ranX, ranY])
        danger++
    }

    this.player.inDanger()
}

module.exports = Game
