const Player = require('./Player.js')
const emoji = require('node-emoji')

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

Game.prototype.genMap = function() {
    let visLoc = this.player.visitedLocations
    this.mapDisplay = []

    for (let y = 0; y < this.yLength; y++) {
        this.mapDisplay.push([])
        for (let x = 0; x < this.xLength; x++) {
            this.mapDisplay[y].push('N')
        }
    }

    for (let suspected of this.suspectedDangers) {
        this.mapDisplay[suspected[1] - 1][suspected[0] - 1] = '?'
    }

    for (let z of visLoc) {
        let xLoc = z[0],
            yLoc = z[1],
            dangersCloseBy = 0

        this.mapDisplay[xLoc][yLoc] = '*'

        for (let danger of this.dangers) {

            let dangerCoor = danger.dangerCoor,
                xVisit = xLoc,
                yVisit = yLoc

            if (xVisit + 1 === dangerCoor[0] && yVisit + 1 === dangerCoor[1]) dangersCloseBy++
            if (xVisit + 1 === dangerCoor[0] && yVisit - 1 === dangerCoor[1]) dangersCloseBy++
            if (xVisit + 1 === dangerCoor[0] && yVisit + 0 === dangerCoor[1]) dangersCloseBy++
            if (xVisit + 0 === dangerCoor[0] && yVisit + 1 === dangerCoor[1]) dangersCloseBy++
            if (xVisit - 1 === dangerCoor[0] && yVisit + 1 === dangerCoor[1]) dangersCloseBy++
            if (xVisit - 1 === dangerCoor[0] && yVisit + 0 === dangerCoor[1]) dangersCloseBy++
            if (xVisit - 1 === dangerCoor[0] && yVisit - 1 === dangerCoor[1]) dangersCloseBy++
            if (xVisit - 0 === dangerCoor[0] && yVisit - 1 === dangerCoor[1]) dangersCloseBy++

            if (xVisit === dangerCoor[0] && yVisit === dangerCoor[1])
                this.mapDisplay[dangerCoor[0]][dangerCoor[1]] = 'X'
        }

        if (dangersCloseBy > 0 && this.mapDisplay[xLoc][yLoc] !== 'X') this.mapDisplay[xLoc][yLoc] = dangersCloseBy
    }

    this.mapDisplay[this.player.xPos][this.player.yPos] = '&'
    this.mapDisplay[this.xGoal][this.yGoal] = '!!'

    if (this.player.xPos === this.xGoal && this.player.yPos ===  this.yGoal) {
        console.log('You won the game!')
        console.log(emoji.get('smiley'), ' Yay!')
        process.exit()
    }
}

Game.prototype.genDangers = function() {

    const dangers = [
        'You fell off a cliff. Yahoooooooooo!',
        'A pack of wolves got you.  You are not Mowgli?',
        'A blizzard trapped you.  Not from Dairy Queen.',
        'A bear mauled you.  No safety there!',
        'You saw bigfoot???',
        'A penguin speared you with its beak.',
        'A moose licked and left you in its tracks.',
        'A reindeer ran over you.'
      ]

    let danger = 0,
        dangersGenerated = []

    while (danger <= this.numDangers) {
        let ranX = Math.floor(Math.random() * this.yLength) + 1,
            ranY = Math.floor(Math.random() * this.xLength) + 1,
            ranDanger = Math.floor(Math.random() * dangers.length)
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

module.exports = Game
