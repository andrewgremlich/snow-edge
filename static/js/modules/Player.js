import emoji from '../ext/emoji.js'
import outputToScreen from './outputToScreen.js'

function Player(playerData, gameObj) {
  this.lives = playerData.lives
  this.xGameStart = playerData.xPlayerStart
  this.yGameStart = playerData.yPlayerStart
  this.xPos = playerData.xPlayerStart
  this.yPos = playerData.yPlayerStart
  this.dead = playerData.dead
  this.dangersNear = 0
  this.gameObj = gameObj
  this.visitedLocations = [
    [playerData.xPlayerStart, playerData.yPlayerStart]
  ]
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
    outputToScreen(emoji['hand'])
    outputToScreen('Can not move farther than one square')
  } else if (xAbs >= 1 || yAbs >= 1) {
    this.xPos = newXpos
    this.yPos = newYpos
    this.updateVisitedLocations()
  } else {
    outputToScreen(emoji['confused'])
    outputToScreen('You have inputed invalid coordinates')
  }
  this.inDanger()
}

Player.prototype.inDanger = function() {

  this.dangersNear = 0

  for (let danger of this.gameObj.dangers) {
    if (danger.dangerCoor[0] === this.xPos && danger.dangerCoor[1] === this.yPos) {
      if (this.lives === 0) {
        this.die(danger.danger)
      } else {
        this.lives--
          this.xPos = this.xGameStart
        this.yPos = this.yGameStart
        outputToScreen(`${danger.danger} You dead bro!`)
        outputToScreen(emoji['hammer'])
        outputToScreen(emoji['heart'])
        outputToScreen(`Lost one life. Restarting at ${ this.xGameStart + 1 }, ${ this.yGameStart + 1 }`)
        outputToScreen(`You have ${ this.lives } ${ this.lives === 1 ? 'life' : 'lives' } left.`)
        for (let i = 0; i < this.lives; i++) {
          outputToScreen(emoji['heart'])
        }
        this.gameObj.genMap()
      }
    }

    let xDangerCoor = danger.dangerCoor[0],
      yDangerCoor = danger.dangerCoor[1]

    if (xDangerCoor - 1 === this.xPos && yDangerCoor - 1 === this.yPos) this.dangersNear++;
    if (xDangerCoor - 0 === this.xPos && yDangerCoor - 1 === this.yPos) this.dangersNear++;
    if (xDangerCoor - 1 === this.xPos && yDangerCoor + 1 === this.yPos) this.dangersNear++;
    if (xDangerCoor - 1 === this.xPos && yDangerCoor + 0 === this.yPos) this.dangersNear++;
    if (xDangerCoor + 1 === this.xPos && yDangerCoor + 1 === this.yPos) this.dangersNear++;
    if (xDangerCoor + 0 === this.xPos && yDangerCoor + 1 === this.yPos) this.dangersNear++;
    if (xDangerCoor + 1 === this.xPos && yDangerCoor - 1 === this.yPos) this.dangersNear++;
    if (xDangerCoor + 1 === this.xPos && yDangerCoor - 0 === this.yPos) this.dangersNear++;
  }

  if (this.dangersNear !== 0) {
    let isAre = this.dangersNear === 1 ? 'is' : 'are',
      dangersOrS = this.dangersNear === 1 ? 'danger' : 'dangers'

    // outputToScreen('\x1b[31m')
    outputToScreen(`There ${ isAre } ${ this.dangersNear } ${ dangersOrS } near by.  Be careful!`)
    // outputToScreen('\x1b[0m')
  }
}

Player.prototype.die = function(danger) {
  this.dead = true
  if (this.dead) {
    outputToScreen(`${danger} You dead bro!`)
    // command for game over? to reset?
    // process.exit()
  }
}

export default Player
