import Player from './Player.js'
import outputToScreen from './outputToScreen.js'
import dangers from '../ext/dangers.js'
import initGame from './InitGame.js'

function Game(gameSettings) {
  this.mapDisplay = []
  this.player = new Player({
    yPlayerStart: gameSettings.yPlayerStart,
    xPlayerStart: gameSettings.xPlayerStart,
    lives: gameSettings.lives,
    dead: false
  }, this)
  this.difficulty = gameSettings.difficulty
  this.yLength = gameSettings.yLength
  this.xLength = gameSettings.xLength
  this.dangers = []
  this.suspectedDangers = []
  this.yGoal = gameSettings.yGoal
  this.xGoal = gameSettings.xGoal
  this.numDangers = gameSettings.numDangers
}

Game.prototype.generateUnvisitedAreas = function() {
  //Generate unvisited areas
  for (let y = 0; y < this.yLength; y++) {
    this.mapDisplay.push([])
    for (let x = 0; x < this.xLength; x++) {
      this.mapDisplay[y].push('.')
    }
  }

  for (let suspected of this.suspectedDangers) {
    this.mapDisplay[suspected[1] - 1][suspected[0] - 1] = '?'
  }
}

Game.prototype.generateVisitedAreas = function(visLoc) {
  for (let z of visLoc) {
    let xLoc = z[0],
      yLoc = z[1],
      dangersCloseBy = 0

    this.mapDisplay[xLoc][yLoc] = '*'

    for (let danger of this.dangers) {

      let dangerCoor = danger.dangerCoor,
        xVisit = xLoc,
        yVisit = yLoc

      if (xVisit + 1 === dangerCoor[0] && yVisit + 1 === dangerCoor[1]) dangersCloseBy++;
      if (xVisit + 1 === dangerCoor[0] && yVisit - 1 === dangerCoor[1]) dangersCloseBy++;
      if (xVisit + 1 === dangerCoor[0] && yVisit + 0 === dangerCoor[1]) dangersCloseBy++;
      if (xVisit + 0 === dangerCoor[0] && yVisit + 1 === dangerCoor[1]) dangersCloseBy++;
      if (xVisit - 1 === dangerCoor[0] && yVisit + 1 === dangerCoor[1]) dangersCloseBy++;
      if (xVisit - 1 === dangerCoor[0] && yVisit + 0 === dangerCoor[1]) dangersCloseBy++;
      if (xVisit - 1 === dangerCoor[0] && yVisit - 1 === dangerCoor[1]) dangersCloseBy++;
      if (xVisit - 0 === dangerCoor[0] && yVisit - 1 === dangerCoor[1]) dangersCloseBy++;

      if (xVisit === dangerCoor[0] && yVisit === dangerCoor[1])
        this.mapDisplay[dangerCoor[0]][dangerCoor[1]] = 'X';
    }

    if (dangersCloseBy > 0 && this.mapDisplay[xLoc][yLoc] !== 'X')
      this.mapDisplay[xLoc][yLoc] = dangersCloseBy;
  }

}

Game.prototype.gameWon = function() {
  if (this.player.xPos === this.xGoal && this.player.yPos === this.yGoal) {
    outputToScreen('🔥🔥🔥🔥🔥 You won the game!  🔥🔥🔥🔥🔥🔥')
    outputToScreen('😄😄😄😄😄😄😄😄😄😄')
    outputToScreen(`Will restart on ${ window.playGame.difficulty } difficulty`)

    initGame(window.playGame.difficulty)
  }
}

Game.prototype.genMap = function() {
  let visLoc = this.player.visitedLocations
  this.mapDisplay = []

  this.generateUnvisitedAreas()
  this.generateVisitedAreas(visLoc)

  this.mapDisplay[this.player.xPos][this.player.yPos] = '&'
  this.mapDisplay[this.xGoal][this.yGoal] = '!!'

  this.gameWon()
}

Game.prototype.genDangers = function() {

  let danger = 0,
    dangersGenerated = []

  while (danger <= this.numDangers) {
    let ranX = Math.floor(Math.random() * this.yLength) + 1,
      ranY = Math.floor(Math.random() * this.xLength) + 1,
      ranDanger = Math.floor(Math.random() * dangers.length),
      exists = false

    for (let dan of dangersGenerated) {
      if (dan[0] === ranX && dan[0] === ranY)
        exists = true
    }

    if (!exists) {
      this.dangers.push({
        dangerCoor: [ranX, ranY],
        danger: dangers[ranDanger]
      })
      danger++
    }
  }

  this.player.inDanger()
}

export default Game
