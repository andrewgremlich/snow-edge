const emoji = require('node-emoji')

function Player(playerData, gameObj) {
    this.lives = playerData.lives
    this.xGameStart = playerData.xPlayerStart
    this.yGameStart = playerData.yPlayerStart
    this.xPos = playerData.xPlayerStart
    this.yPos = playerData.yPlayerStart
    this.dead = playerData.dead
    this.dangersNear = 0
    this.gameObj = gameObj
    this.visitedLocations = [[playerData.xPlayerStart, playerData.yPlayerStart]]
}

Player.prototype.updateVisitedLocations = function() {
    this.visitedLocations.push([this.xPos, this.yPos])
    this.gameObj.genMap()
}

Player.prototype.move = function(y, x) {
    let newXpos = x - 1,
        newYpos = y - 1,
        xAbs = Math.abs(newXpos - this.xPos),
        yAbs = Math.abs(newYpos - this.yPos)

    if (xAbs > 1 || yAbs > 1) {
        console.log(emoji.get('hand'), ' Stop!')
        console.log('Can not move farther than one square')
    } else if (xAbs >= 1 || yAbs >= 1) {
        this.xPos = newXpos
        this.yPos = newYpos
        this.updateVisitedLocations()
    } else {
        console.log(emoji.get('confused'), ' What?')
        console.log('You have inputed invalid coordinates')
    }
    this.inDanger()
}

Player.prototype.inDanger = function () {

    this.dangersNear = 0

    for (let danger of this.gameObj.dangers) {
        if (danger.dangerCoor[0] === this.xPos && danger.dangerCoor[1] === this.yPos) {
            if (this.lives === 0) {
                this.die(danger.danger)
            } else {
                this.lives--
                this.xPos = this.xGameStart
                this.yPos = this.yGameStart
                console.log(`${danger.danger} You dead bro!`)
                console.log(emoji.get('hammer'))
                console.log(emoji.get('heart'))
                console.log(`Lost one life. Restarting at ${ this.xGameStart + 1 }, ${ this.yGameStart + 1 }`)
                console.log(`You have ${ this.lives } ${ this.lives === 1 ? 'life' : 'lives' } left.`)
                for (let i = 0; i < this.lives; i++) {
                  console.log(emoji.get('heart'))
                }
                this.gameObj.genMap()
            }
        }

        let xDangerCoor = danger.dangerCoor[0],
            yDangerCoor = danger.dangerCoor[1]

        if (xDangerCoor - 1 === this.xPos && yDangerCoor - 1 === this.yPos) this.dangersNear++
        if (xDangerCoor - 0 === this.xPos && yDangerCoor - 1 === this.yPos) this.dangersNear++
        if (xDangerCoor - 1 === this.xPos && yDangerCoor + 1 === this.yPos) this.dangersNear++
        if (xDangerCoor - 1 === this.xPos && yDangerCoor + 0 === this.yPos) this.dangersNear++
        if (xDangerCoor + 1 === this.xPos && yDangerCoor + 1 === this.yPos) this.dangersNear++
        if (xDangerCoor + 0 === this.xPos && yDangerCoor + 1 === this.yPos) this.dangersNear++
        if (xDangerCoor + 1 === this.xPos && yDangerCoor - 1 === this.yPos) this.dangersNear++
        if (xDangerCoor + 1 === this.xPos && yDangerCoor - 0 === this.yPos) this.dangersNear++
    }

    if (this.dangersNear !== 0) {
        let isAre = this.dangersNear === 1 ? 'is' : 'are',
            dangersOrS = this.dangersNear === 1 ? 'danger' : 'dangers'

        console.log('\x1b[31m')
        console.log(`There ${ isAre } ${ this.dangersNear } ${ dangersOrS } near by.  Be careful!`)
        console.log('\x1b[0m')
    }
}

Player.prototype.die = function(danger) {
    this.dead = true
    if (this.dead) {
        console.log(`${danger} You dead bro!`)
        process.exit()
    }
}

module.exports = Player
