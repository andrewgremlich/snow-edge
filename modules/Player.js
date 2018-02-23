function Player(xPos, yPos, dead, gameObj) {
    this.xPos = xPos
    this.yPos = yPos
    this.dead = dead
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

    console.log(newXpos, newYpos)

    if (newXpos - this.xPos > 1 && newYpos - this.yPos > 1) {
        console.log('Can not move farther than one square')
    } else if (newXpos - this.xPos <= 1 && newYpos - this.yPos <= 1) {
        this.xPos = newXpos
        this.yPos = newYpos

        this.updateVisitedLocations()
    } else {
        console.log('You have inputed invalid coordinates')
    }
}

Player.prototype.die = function() {
    this.dead = true
}

module.exports = Player
