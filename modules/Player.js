function Player(xPos, yPos, dead) {
    this.xPos = xPos
    this.yPos = yPos
    this.dead = dead
}

Player.prototype.move = function(newXpos, newYpos) {
    this.xPos = newXpos
    this.yPos = newYpos
}

Player.prototype.die = function() {
    this.dead = true
}

module.exports = Player
