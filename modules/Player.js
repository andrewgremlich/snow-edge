function Player(xPos, yPos, dead) {
    this.xPos = xPos
    this.yPos = yPos
    this.dead = dead
    this.visitedLocations = [[xPos, yPos]]
}

Player.prototype.updateVisitedLocations = function() {
    this.visitedLocations.push([this.xPos, this.yPos]) 

    //THIS IS where I would need to call super and the genMap function
}

Player.prototype.move = function(newXpos, newYpos) {
    this.xPos = newXpos
    this.yPos = newYpos

    this.updateVisitedLocations()

    //There also needs to be a limit so the player doesnt jump around map
    //but adjacent locations.
}

Player.prototype.die = function() {
    this.dead = true
}

module.exports = Player
