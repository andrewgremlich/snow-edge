import outputToScreen from './outputToScreen.js'
import initGame from './InitGame.js'

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
    outputToScreen(`✋ Can not move farther than one square`)
  } else if (xAbs >= 1 || yAbs >= 1) {
    this.xPos = newXpos
    this.yPos = newYpos
    this.updateVisitedLocations()
    this.inDanger()
  } else {
    outputToScreen(`😕 You have inputed invalid coordinates`)
  }
}

Player.prototype.inDanger = function() {

  this.dangersNear = 0

  for (let danger of this.gameObj.dangers) {
    if (danger.dangerCoor[0] === this.xPos && danger.dangerCoor[1] === this.yPos) {
      if (this.lives === 1) {
        this.die(danger.danger)
      } else {
        this.lives--
          this.xPos = this.xGameStart
        this.yPos = this.yGameStart

        outputToScreen('💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀')
        outputToScreen(`${danger.danger} You dead bro! 💔`)
        outputToScreen(`Lost one life. Restarting at ${ this.xGameStart + 1 }, ${ this.yGameStart + 1 }`)
        outputToScreen(`You have ${ this.lives } ${ this.lives === 1 ? 'life' : 'lives' } left.`)
        this.heartsLeft()
        outputToScreen('💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀')
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
}

Player.prototype.heartsLeft = function() {
  let heartsLeft = ''

  for (let i = 0; i < this.lives; i++) {
    heartsLeft += '💜'
  }
  outputToScreen(heartsLeft)
  this.gameObj.genMap()
}

Player.prototype.die = function(danger) {
  this.dead = true
  if (this.dead) {
    outputToScreen(`${danger} You dead bro!`)
    outputToScreen(`Will restart on ${ window.playGame.difficulty } difficulty`)

    initGame(window.playGame.difficulty)
  }
}

export default Player
