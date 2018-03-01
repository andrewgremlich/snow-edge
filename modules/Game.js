const Player = require('./Player.js')

function Game(yLength, xLength, yPlayerStart, xPlayerStart, yGoal, xGoal, numDangers) {
    this.mapDisplay = []
    this.player = new Player(yPlayerStart, xPlayerStart, false, this)
    this.yLength = yLength
    this.xLength = xLength
    this.dangers = []
    this.yGoal = yGoal
    this.xGoal = xGoal
    this.numDangers = numDangers
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
        }

        if (dangersCloseBy > 0) this.mapDisplay[xLoc][yLoc] = dangersCloseBy
    }

    this.mapDisplay[this.player.xPos][this.player.yPos] = '&'
    this.mapDisplay[this.xGoal][this.yGoal] = '!!'

    if (this.player.xPos === this.xGoal && this.player.yPos ===  this.yGoal) {
        console.log('You won the game!')
        process.exit()
    }
}

Game.prototype.genDangers = function() {

    const dangers = [
        'You fell off a cliff.',
        'You got eaten by a pack of wolves.',
        'You got got by a blizzard.',
        'You got mauled by a bear.',
        'You saw bigfoot???',
        'A penguin speared you with its beak.'
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
