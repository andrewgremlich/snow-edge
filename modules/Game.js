const Player = require('./Player.js')

function Game(xDim, yDim, playerStartX, playerStartY) {
   this.mapArray = []
   this.player = new Player(playerStartX, playerStartY, false)
   this.xDim = xDim
   this.yDim = yDim
   this.dangers = []
}

Game.prototype.genMap = function() {
    for (let x = 0; x < this.xDim; x++) {
        this.mapArray.push([])
        for (let y = 0; y < this.yDim; y++) {
            this.mapArray[x].push('N')
        }
    }
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
}

module.exports = Game
