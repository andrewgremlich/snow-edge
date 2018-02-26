function Player(xPos, yPos, dead, gameObj) {
    this.xPos = xPos
    this.yPos = yPos
    this.dead = dead
    this.dangersNear = 0
    this.gameObj = gameObj
    this.visitedLocations = [[xPos, yPos]]
}

Player.prototype.updateVisitedLocations = function() {
    this.visitedLocations.push([this.xPos, this.yPos]) 
    this.gameObj.genMap()
}

Player.prototype.move = function(y, x) {
    let newXpos = x - 1,
        newYpos = y - 1
    if (newXpos - this.xPos > 1 && newYpos - this.yPos > 1) {
        console.log('Can not move farther than one square')
    } else if (newXpos - this.xPos <= 1 && newYpos - this.yPos <= 1) {
        this.xPos = newXpos
        this.yPos = newYpos
        this.updateVisitedLocations()
    } else {
        console.log('You have inputed invalid coordinates')
    }

    this.inDanger()
}

Player.prototype.inDanger = function () {

    for (let dangerCoor of this.gameObj.dangers) {
        if (dangerCoor[0] === this.xPos && dangerCoor[1] === this.yPos) {
            this.die() 
        }

        if (dangerCoor[0] - 1 === this.xPos && dangerCoor[1] - 1 === this.yPos) this.dangersNear++
        if (dangerCoor[0] - 1 === this.xPos && dangerCoor[1] + 1 === this.yPos) this.dangersNear++
        if (dangerCoor[0] + 1 === this.xPos && dangerCoor[1] + 1 === this.yPos) this.dangersNear++
        if (dangerCoor[0] + 1 === this.xPos && dangerCoor[1] - 1 === this.yPos) this.dangersNear++
    }

    if (this.dangersNear !== 0) {
        let isAre = this.dangersNear === 1 ? 'is' : 'are',
            dangerOrS = this.dangersNear === 1 ? 'danger' : 'dangers' 

        console.log(`There ${ isAre } ${ this.dangersNear } ${ dangersOrS } near by.  Be careful!`)
    }
}

Player.prototype.die = function() {
    this.dead = true
    if (this.dead) {
        console.log('Game is over. You dead bro!')
        process.exit()
    }
}

module.exports = Player
