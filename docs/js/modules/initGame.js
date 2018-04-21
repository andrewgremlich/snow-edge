import Game from './Game.js'
import diffRanges from '../ext/diff.js'

function initGame(difficulty) {
  let gameSettings = diffRanges[difficulty],
    game = new Game(gameSettings)

  window.playGame = game

  playGame.genMap()
  playGame.genDangers()
}

export default initGame
