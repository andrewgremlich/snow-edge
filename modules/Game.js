const Player = require('./Player.js'),
    xDim = 10,
    yDim = 10

function Game(xDim, yDim, playerStartX, playerStartY) {
   this.mapArray = []
   this.player = new Player(playerStartX, playerStartY, false)
   this.xDim = xDim
   this.yDim = yDim
}

Game.prototype.genMap = function() {
    for (let x = 0; x < xDim; x++) {
        this.mapArray.push([])
        for (let y = 0; y < yDim; y++) {
            this.mapArray[x].push('N')
        }
    }
}

Game.prototype.genDangers = function() {

}

module.exports = Game
