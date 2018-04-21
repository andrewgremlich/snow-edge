(function () {
  'use strict';

  var output = document.querySelector('output');

  function outputToScreen(text) {
    var textNode = document.createTextNode(text),
        paragraphOutput = document.createElement('pre');

    paragraphOutput.appendChild(textNode);
    output.appendChild(paragraphOutput);
    paragraphOutput.scrollIntoView();
  }

  function Player(playerData, gameObj) {
    this.lives = playerData.lives;
    this.xGameStart = playerData.xPlayerStart;
    this.yGameStart = playerData.yPlayerStart;
    this.xPos = playerData.xPlayerStart;
    this.yPos = playerData.yPlayerStart;
    this.dead = playerData.dead;
    this.dangersNear = 0;
    this.gameObj = gameObj;
    this.visitedLocations = [[playerData.xPlayerStart, playerData.yPlayerStart]];
  }

  Player.prototype.updateVisitedLocations = function () {
    this.visitedLocations.push([this.xPos, this.yPos]);
    this.gameObj.genMap();
  };

  Player.prototype.move = function (y, x) {
    var newXpos = x - 1,
        newYpos = y - 1,
        xAbs = Math.abs(newXpos - this.xPos),
        yAbs = Math.abs(newYpos - this.yPos);

    if (xAbs > 1 || yAbs > 1) {
      outputToScreen('\u270B Can not move farther than one square');
    } else if (xAbs >= 1 || yAbs >= 1) {
      this.xPos = newXpos;
      this.yPos = newYpos;
      this.updateVisitedLocations();
    } else {
      outputToScreen('\uD83D\uDE15 You have inputed invalid coordinates');
    }
    this.inDanger();
  };

  Player.prototype.inDanger = function () {

    this.dangersNear = 0;

    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = this.gameObj.dangers[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var danger = _step.value;

        if (danger.dangerCoor[0] === this.xPos && danger.dangerCoor[1] === this.yPos) {
          if (this.lives === 0) {
            this.die(danger.danger);
          } else {
            this.lives--;
            this.xPos = this.xGameStart;
            this.yPos = this.yGameStart;
            outputToScreen(danger.danger + ' You dead bro!');
            outputToScreen('\uD83D\uDC94');
            outputToScreen('Lost one life. Restarting at ' + (this.xGameStart + 1) + ', ' + (this.yGameStart + 1));
            outputToScreen('You have ' + this.lives + ' ' + (this.lives === 1 ? 'life' : 'lives') + ' left.');

            var heartsLeft = '';

            for (var i = 0; i < this.lives; i++) {
              heartsLeft += '💜';
            }

            outputToScreen(heartsLeft);
            this.gameObj.genMap();
          }
        }

        var xDangerCoor = danger.dangerCoor[0],
            yDangerCoor = danger.dangerCoor[1];

        if (xDangerCoor - 1 === this.xPos && yDangerCoor - 1 === this.yPos) this.dangersNear++;
        if (xDangerCoor - 0 === this.xPos && yDangerCoor - 1 === this.yPos) this.dangersNear++;
        if (xDangerCoor - 1 === this.xPos && yDangerCoor + 1 === this.yPos) this.dangersNear++;
        if (xDangerCoor - 1 === this.xPos && yDangerCoor + 0 === this.yPos) this.dangersNear++;
        if (xDangerCoor + 1 === this.xPos && yDangerCoor + 1 === this.yPos) this.dangersNear++;
        if (xDangerCoor + 0 === this.xPos && yDangerCoor + 1 === this.yPos) this.dangersNear++;
        if (xDangerCoor + 1 === this.xPos && yDangerCoor - 1 === this.yPos) this.dangersNear++;
        if (xDangerCoor + 1 === this.xPos && yDangerCoor - 0 === this.yPos) this.dangersNear++;
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator.return) {
          _iterator.return();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }

    if (this.dangersNear !== 0) {
      var isAre = this.dangersNear === 1 ? 'is' : 'are',
          dangersOrS = this.dangersNear === 1 ? 'danger' : 'dangers';

      outputToScreen('There ' + isAre + ' ' + this.dangersNear + ' ' + dangersOrS + ' near by.  Be careful!');
    }
  };

  Player.prototype.die = function (danger) {
    this.dead = true;
    if (this.dead) {
      outputToScreen(danger + ' You dead bro!');
      outputToScreen('Will restart on ' + window.playGame.difficulty + ' difficulty');

      initGame(window.playGame.difficulty);
    }
  };

  var dangers = ['You fell off a cliff. Yahoooooooooo! 👍👊', '🐺🐺🐺 A pack of wolves got you.  You are not Mowgli? 🐺🐺🐺', '❄️ A blizzard trapped you.  Not from Dairy Queen. ❄️', '🐻 A bear mauled you.  No safety there!', '👣 You saw bigfoot???', '🐧 A penguin speared you with its beak.', '👅 A moose licked and left you in its tracks.', 'A reindeer ran over you.', '✉️ An email soared out of the sky and smacked you in the head.', 'Your pizza 🍕 froze ❄️.  You have nothing to eat!', 'Deadpool popped out from behind a tree and stabbed you. ⚔', 'You got sick with a cold. 🤒'];

  function Game(gameSettings) {
    this.mapDisplay = [];
    this.player = new Player({
      yPlayerStart: gameSettings.yPlayerStart,
      xPlayerStart: gameSettings.xPlayerStart,
      lives: gameSettings.lives,
      dead: false
    }, this);
    this.difficulty = gameSettings.difficulty;
    this.yLength = gameSettings.yLength;
    this.xLength = gameSettings.xLength;
    this.dangers = [];
    this.suspectedDangers = [];
    this.yGoal = gameSettings.yGoal;
    this.xGoal = gameSettings.xGoal;
    this.numDangers = gameSettings.numDangers;
  }

  //TODO cleanup function
  Game.prototype.genMap = function () {
    var visLoc = this.player.visitedLocations;
    this.mapDisplay = [];

    for (var y = 0; y < this.yLength; y++) {
      this.mapDisplay.push([]);
      for (var x = 0; x < this.xLength; x++) {
        this.mapDisplay[y].push('N');
      }
    }

    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = this.suspectedDangers[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var suspected = _step.value;

        this.mapDisplay[suspected[1] - 1][suspected[0] - 1] = '?';
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator.return) {
          _iterator.return();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }

    var _iteratorNormalCompletion2 = true;
    var _didIteratorError2 = false;
    var _iteratorError2 = undefined;

    try {
      for (var _iterator2 = visLoc[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
        var z = _step2.value;

        var xLoc = z[0],
            yLoc = z[1],
            dangersCloseBy = 0;

        this.mapDisplay[xLoc][yLoc] = '*';

        var _iteratorNormalCompletion3 = true;
        var _didIteratorError3 = false;
        var _iteratorError3 = undefined;

        try {
          for (var _iterator3 = this.dangers[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
            var danger = _step3.value;


            var dangerCoor = danger.dangerCoor,
                xVisit = xLoc,
                yVisit = yLoc;

            if (xVisit + 1 === dangerCoor[0] && yVisit + 1 === dangerCoor[1]) dangersCloseBy++;
            if (xVisit + 1 === dangerCoor[0] && yVisit - 1 === dangerCoor[1]) dangersCloseBy++;
            if (xVisit + 1 === dangerCoor[0] && yVisit + 0 === dangerCoor[1]) dangersCloseBy++;
            if (xVisit + 0 === dangerCoor[0] && yVisit + 1 === dangerCoor[1]) dangersCloseBy++;
            if (xVisit - 1 === dangerCoor[0] && yVisit + 1 === dangerCoor[1]) dangersCloseBy++;
            if (xVisit - 1 === dangerCoor[0] && yVisit + 0 === dangerCoor[1]) dangersCloseBy++;
            if (xVisit - 1 === dangerCoor[0] && yVisit - 1 === dangerCoor[1]) dangersCloseBy++;
            if (xVisit - 0 === dangerCoor[0] && yVisit - 1 === dangerCoor[1]) dangersCloseBy++;

            if (xVisit === dangerCoor[0] && yVisit === dangerCoor[1]) this.mapDisplay[dangerCoor[0]][dangerCoor[1]] = 'X';
          }
        } catch (err) {
          _didIteratorError3 = true;
          _iteratorError3 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion3 && _iterator3.return) {
              _iterator3.return();
            }
          } finally {
            if (_didIteratorError3) {
              throw _iteratorError3;
            }
          }
        }

        if (dangersCloseBy > 0 && this.mapDisplay[xLoc][yLoc] !== 'X') this.mapDisplay[xLoc][yLoc] = dangersCloseBy;
      }
    } catch (err) {
      _didIteratorError2 = true;
      _iteratorError2 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion2 && _iterator2.return) {
          _iterator2.return();
        }
      } finally {
        if (_didIteratorError2) {
          throw _iteratorError2;
        }
      }
    }

    this.mapDisplay[this.player.xPos][this.player.yPos] = '&';
    this.mapDisplay[this.xGoal][this.yGoal] = '!!';

    if (this.player.xPos === this.xGoal && this.player.yPos === this.yGoal) {
      outputToScreen('You won the game!');
      outputToScreen('😄');
      outputToScreen('Will restart on ' + window.playGame.difficulty + ' difficulty');

      initGame(window.playGame.difficulty);
    }
  };

  Game.prototype.genDangers = function () {

    var danger = 0,
        dangersGenerated = [];

    while (danger <= this.numDangers) {
      var ranX = Math.floor(Math.random() * this.yLength) + 1,
          ranY = Math.floor(Math.random() * this.xLength) + 1,
          ranDanger = Math.floor(Math.random() * dangers.length),
          exists = false;

      var _iteratorNormalCompletion4 = true;
      var _didIteratorError4 = false;
      var _iteratorError4 = undefined;

      try {
        for (var _iterator4 = dangersGenerated[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
          var dan = _step4.value;

          if (dan[0] === ranX && dan[0] === ranY) exists = true;
        }
      } catch (err) {
        _didIteratorError4 = true;
        _iteratorError4 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion4 && _iterator4.return) {
            _iterator4.return();
          }
        } finally {
          if (_didIteratorError4) {
            throw _iteratorError4;
          }
        }
      }

      if (!exists) {
        this.dangers.push({
          dangerCoor: [ranX, ranY],
          danger: dangers[ranDanger]
        });
        danger++;
      }
    }

    this.player.inDanger();
  };

  var diffRanges = {
    easy: {
      difficulty: 'easy',
      yLength: 10,
      xLength: 10,
      yPlayerStart: 0,
      xPlayerStart: 0,
      yGoal: 8,
      xGoal: 8,
      numDangers: 12,
      lives: 5
    },
    medium: {
      difficulty: 'medium',
      yLength: 12,
      xLength: 12,
      yPlayerStart: 1,
      xPlayerStart: 1,
      yGoal: 10,
      xGoal: 10,
      numDangers: 30,
      lives: 3
    },
    hard: {
      difficulty: 'hard',
      yLength: 14,
      xLength: 14,
      yPlayerStart: 2,
      xPlayerStart: 2,
      yGoal: 12,
      xGoal: 12,
      numDangers: 70,
      lives: 1
    },
    ludicrous: {
      difficulty: 'ludicrous',
      yLength: 14,
      xLength: 14,
      yPlayerStart: 2,
      xPlayerStart: 2,
      yGoal: 12,
      xGoal: 12,
      numDangers: 70,
      lives: 1
    }
  };

  function initGame(difficulty) {
    var gameSettings = diffRanges[difficulty],
        game = new Game(gameSettings);

    window.playGame = game;
  }

  var commands = '\nAvailable commands.\n***Basic Commands\n[m]    Show Map\n[h]    Hike Mountain (example command \'h 2 2\')\n[s]    Mark suspected danger\n[r]    Remind nearby dangers\n[p]    Show current position\n\n***Help Commands\n[g]    Show guide\n[c]    Show commands again\n[l]    Show Legend\n[d]    Change difficulty\n';

  function validateCoordinates(command) {
    var numCheck = /\d+/g,
        coordinates = command.match(numCheck),
        y = +coordinates[1],
        x = +coordinates[0];

    if (!numCheck.test(command) || coordinates.length !== 2) {
      outputToScreen('Invalid coordinates');
      outputToScreen('Must be two numbers');
      return false;
    }
    if (x < 1 || y < 1 || x > playGame.xLength || y > playGame.yLength) {
      outputToScreen('😕');
      outputToScreen('Must be valid x and y coordinates');
      outputToScreen('Must input coordinates (1,1) to (' + playGame.xLength + ',' + playGame.yLength + ')');
      return false;
    }

    return [x, y];
  }

  var commands$1 = {
    p: function p() {
      var playerData = window.playGame.player;

      outputToScreen('Your current position is (' + (playerData.yPos + 1) + ',' + (playerData.xPos + 1) + ')');
    },
    d: function d(line) {
      var commandIs = line.split(' '),
          difficultySettings = ['easy', 'medium', 'hard', 'ludicrous'];

      if (commandIs.length !== 2 || !difficultySettings.includes(commandIs[1])) {
        outputToScreen('Invalid command.');
        return;
      }
      initGame(commandIs[1]);
      outputToScreen('Game difficulty changed!');
    },
    r: function r() {
      var playerData = playGame.player,
          isAre = playerData.dangersNear === 1 ? 'is' : 'are',
          dangerOrS = playerData.dangersNear === 1 ? 'danger' : 'dangers',
          careful = playerData.dangersNear === 0 ? '' : 'Be careful!';

      outputToScreen('There ' + isAre + ' ' + playerData.dangersNear + ' ' + dangerOrS + ' near by.  ' + careful);
    },
    s: function s(command) {
      outputToScreen('Marking suspected danger on map...');
      var coordinates = validateCoordinates(command);
      if (coordinates) playGame.suspectedDangers.push(coordinates);
      this.m();
    },
    g: function g() {
      outputToScreen('\n\n  /*********************************************/\n        Welcome to SnowEdge!\n  /*********************************************/\n\n  You are a daring explorer.  You decided to scale\n  Mount Denali in a snow storm!  You find your way\n  to the top, but be careful!  There are dangers\n  along the way.  You will recieve cues on your\n  map when you are near danger, but you must make\n  the right choice where to go!\n\n  Be careful on this great adventurous endeavor!\n\n  The map is a 10 x 10 grid, with (0,0) starting\n  in the top left corner.\n\n  ' + commands + '\n                  ');
    },
    c: function c() {
      outputToScreen('' + commands);
    },
    h: function h(command) {
      outputToScreen('Hiking mountain...');
      var coordinates = validateCoordinates(command);
      if (coordinates) playGame.player.move(+coordinates[0], +coordinates[1]);
      this.m();
    },
    l: function l() {
      outputToScreen('\n\n  /*****   MAP LEGEND   *****/\n\n  * \'&\'     Player Icon\n  * \'N\'     Unknown location\n  * \'*\'     Visited location with no danger.\n  * \'X\'     Visited location with known danger.\n  * \'?\'     Location with suspected danger.\n\n  * Nearby dangers appear as a number\n      * i.e. \'1\' or \'2\'.\n              ');
    },
    m: function m() {

      if (playGame.difficulty === 'ludicrous') return outputToScreen('Map is disabled on ludicrous difficulty.');

      playGame.genMap();

      var mapOutString = '';
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = playGame.mapDisplay[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var row = _step.value;
          var _iteratorNormalCompletion2 = true;
          var _didIteratorError2 = false;
          var _iteratorError2 = undefined;

          try {
            for (var _iterator2 = row[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
              var columnData = _step2.value;

              mapOutString += columnData + '\t';
            }
          } catch (err) {
            _didIteratorError2 = true;
            _iteratorError2 = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion2 && _iterator2.return) {
                _iterator2.return();
              }
            } finally {
              if (_didIteratorError2) {
                throw _iteratorError2;
              }
            }
          }

          mapOutString += '\n';
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      this.l();
      outputToScreen(mapOutString);
      this.p();
      this.r();
    }
  };

  outputToScreen('\u2744\uFE0F\u2744\uFE0F\u2744\uFE0F\u2744\uFE0F\u2744\uFE0F\u2744\uFE0F\u2744\uFE0F\u2744\uFE0F\u2744\uFE0F\u2744\uFE0F\u2744\uFE0F\u2744\uFE0F\u2744\uFE0F\u2744\uFE0F\u2744\uFE0F\u2744\uFE0F\u2744\uFE0F\u2744\uFE0F\u2744\uFE0F\u2744\uFE0F\u2744\uFE0F\u2744\uFE0F\u2744\uFE0F');
  outputToScreen('You have started SNOWEDGE on easy difficulty.');
  outputToScreen('Type `g` to see the instructions');

  initGame('easy');

  playGame.genMap();
  playGame.genDangers();

  document.onkeydown = function (e) {
    var enterKey = e.keyCode,
        activeElement = document.activeElement,
        inputBar = document.querySelector('input[type="text"]');

    if (enterKey === 13 && activeElement === inputBar) {
      var line = inputBar.value,
          availableCommands = Object.keys(commands$1),
          givenInitialCommand = line.charAt(0);

      if (!availableCommands.includes(givenInitialCommand)) outputToScreen('Command not found');

      inputBar.value = '';

      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = availableCommands[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var value = _step.value;

          var command = value;
          if (command === givenInitialCommand) commands$1[command](line);
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }
    }
  };

}());
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXgtYnVuZGxlZC5qcyIsInNvdXJjZXMiOlsibW9kdWxlcy9vdXRwdXRUb1NjcmVlbi5qcyIsIm1vZHVsZXMvUGxheWVyLmpzIiwiZXh0L2RhbmdlcnMuanMiLCJtb2R1bGVzL0dhbWUuanMiLCJleHQvZGlmZi5qcyIsIm1vZHVsZXMvSW5pdEdhbWUuanMiLCJtb2R1bGVzL2NvbW1hbmRzLmpzIiwiaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsibGV0IG91dHB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ291dHB1dCcpXG5cbmZ1bmN0aW9uIG91dHB1dFRvU2NyZWVuKHRleHQpIHtcbiAgbGV0IHRleHROb2RlID0gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUodGV4dCksXG4gICAgcGFyYWdyYXBoT3V0cHV0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncHJlJylcblxuICBwYXJhZ3JhcGhPdXRwdXQuYXBwZW5kQ2hpbGQodGV4dE5vZGUpXG4gIG91dHB1dC5hcHBlbmRDaGlsZChwYXJhZ3JhcGhPdXRwdXQpXG4gIHBhcmFncmFwaE91dHB1dC5zY3JvbGxJbnRvVmlldygpXG59XG5cbmV4cG9ydCBkZWZhdWx0IG91dHB1dFRvU2NyZWVuXG4iLCJpbXBvcnQgb3V0cHV0VG9TY3JlZW4gZnJvbSAnLi9vdXRwdXRUb1NjcmVlbi5qcydcbmltcG9ydCBpbml0R2FtZSBmcm9tICcuL0luaXRHYW1lLmpzJ1xuXG5mdW5jdGlvbiBQbGF5ZXIocGxheWVyRGF0YSwgZ2FtZU9iaikge1xuICB0aGlzLmxpdmVzID0gcGxheWVyRGF0YS5saXZlc1xuICB0aGlzLnhHYW1lU3RhcnQgPSBwbGF5ZXJEYXRhLnhQbGF5ZXJTdGFydFxuICB0aGlzLnlHYW1lU3RhcnQgPSBwbGF5ZXJEYXRhLnlQbGF5ZXJTdGFydFxuICB0aGlzLnhQb3MgPSBwbGF5ZXJEYXRhLnhQbGF5ZXJTdGFydFxuICB0aGlzLnlQb3MgPSBwbGF5ZXJEYXRhLnlQbGF5ZXJTdGFydFxuICB0aGlzLmRlYWQgPSBwbGF5ZXJEYXRhLmRlYWRcbiAgdGhpcy5kYW5nZXJzTmVhciA9IDBcbiAgdGhpcy5nYW1lT2JqID0gZ2FtZU9ialxuICB0aGlzLnZpc2l0ZWRMb2NhdGlvbnMgPSBbXG4gICAgW3BsYXllckRhdGEueFBsYXllclN0YXJ0LCBwbGF5ZXJEYXRhLnlQbGF5ZXJTdGFydF1cbiAgXVxufVxuXG5QbGF5ZXIucHJvdG90eXBlLnVwZGF0ZVZpc2l0ZWRMb2NhdGlvbnMgPSBmdW5jdGlvbigpIHtcbiAgdGhpcy52aXNpdGVkTG9jYXRpb25zLnB1c2goW3RoaXMueFBvcywgdGhpcy55UG9zXSlcbiAgdGhpcy5nYW1lT2JqLmdlbk1hcCgpXG59XG5cblBsYXllci5wcm90b3R5cGUubW92ZSA9IGZ1bmN0aW9uKHksIHgpIHtcbiAgbGV0IG5ld1hwb3MgPSB4IC0gMSxcbiAgICBuZXdZcG9zID0geSAtIDEsXG4gICAgeEFicyA9IE1hdGguYWJzKG5ld1hwb3MgLSB0aGlzLnhQb3MpLFxuICAgIHlBYnMgPSBNYXRoLmFicyhuZXdZcG9zIC0gdGhpcy55UG9zKVxuXG4gIGlmICh4QWJzID4gMSB8fCB5QWJzID4gMSkge1xuICAgIG91dHB1dFRvU2NyZWVuKGDinIsgQ2FuIG5vdCBtb3ZlIGZhcnRoZXIgdGhhbiBvbmUgc3F1YXJlYClcbiAgfSBlbHNlIGlmICh4QWJzID49IDEgfHwgeUFicyA+PSAxKSB7XG4gICAgdGhpcy54UG9zID0gbmV3WHBvc1xuICAgIHRoaXMueVBvcyA9IG5ld1lwb3NcbiAgICB0aGlzLnVwZGF0ZVZpc2l0ZWRMb2NhdGlvbnMoKVxuICB9IGVsc2Uge1xuICAgIG91dHB1dFRvU2NyZWVuKGDwn5iVIFlvdSBoYXZlIGlucHV0ZWQgaW52YWxpZCBjb29yZGluYXRlc2ApXG4gIH1cbiAgdGhpcy5pbkRhbmdlcigpXG59XG5cblBsYXllci5wcm90b3R5cGUuaW5EYW5nZXIgPSBmdW5jdGlvbigpIHtcblxuICB0aGlzLmRhbmdlcnNOZWFyID0gMFxuXG4gIGZvciAobGV0IGRhbmdlciBvZiB0aGlzLmdhbWVPYmouZGFuZ2Vycykge1xuICAgIGlmIChkYW5nZXIuZGFuZ2VyQ29vclswXSA9PT0gdGhpcy54UG9zICYmIGRhbmdlci5kYW5nZXJDb29yWzFdID09PSB0aGlzLnlQb3MpIHtcbiAgICAgIGlmICh0aGlzLmxpdmVzID09PSAwKSB7XG4gICAgICAgIHRoaXMuZGllKGRhbmdlci5kYW5nZXIpXG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmxpdmVzLS1cbiAgICAgICAgdGhpcy54UG9zID0gdGhpcy54R2FtZVN0YXJ0XG4gICAgICAgIHRoaXMueVBvcyA9IHRoaXMueUdhbWVTdGFydFxuICAgICAgICBvdXRwdXRUb1NjcmVlbihgJHtkYW5nZXIuZGFuZ2VyfSBZb3UgZGVhZCBicm8hYClcbiAgICAgICAgb3V0cHV0VG9TY3JlZW4oYPCfkpRgKVxuICAgICAgICBvdXRwdXRUb1NjcmVlbihgTG9zdCBvbmUgbGlmZS4gUmVzdGFydGluZyBhdCAkeyB0aGlzLnhHYW1lU3RhcnQgKyAxIH0sICR7IHRoaXMueUdhbWVTdGFydCArIDEgfWApXG4gICAgICAgIG91dHB1dFRvU2NyZWVuKGBZb3UgaGF2ZSAkeyB0aGlzLmxpdmVzIH0gJHsgdGhpcy5saXZlcyA9PT0gMSA/ICdsaWZlJyA6ICdsaXZlcycgfSBsZWZ0LmApXG5cbiAgICAgICAgbGV0IGhlYXJ0c0xlZnQgPSAnJ1xuXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5saXZlczsgaSsrKSB7XG4gICAgICAgICAgaGVhcnRzTGVmdCArPSAn8J+SnCdcbiAgICAgICAgfVxuXG4gICAgICAgIG91dHB1dFRvU2NyZWVuKGhlYXJ0c0xlZnQpXG4gICAgICAgIHRoaXMuZ2FtZU9iai5nZW5NYXAoKVxuICAgICAgfVxuICAgIH1cblxuICAgIGxldCB4RGFuZ2VyQ29vciA9IGRhbmdlci5kYW5nZXJDb29yWzBdLFxuICAgICAgeURhbmdlckNvb3IgPSBkYW5nZXIuZGFuZ2VyQ29vclsxXVxuXG4gICAgaWYgKHhEYW5nZXJDb29yIC0gMSA9PT0gdGhpcy54UG9zICYmIHlEYW5nZXJDb29yIC0gMSA9PT0gdGhpcy55UG9zKSB0aGlzLmRhbmdlcnNOZWFyKys7XG4gICAgaWYgKHhEYW5nZXJDb29yIC0gMCA9PT0gdGhpcy54UG9zICYmIHlEYW5nZXJDb29yIC0gMSA9PT0gdGhpcy55UG9zKSB0aGlzLmRhbmdlcnNOZWFyKys7XG4gICAgaWYgKHhEYW5nZXJDb29yIC0gMSA9PT0gdGhpcy54UG9zICYmIHlEYW5nZXJDb29yICsgMSA9PT0gdGhpcy55UG9zKSB0aGlzLmRhbmdlcnNOZWFyKys7XG4gICAgaWYgKHhEYW5nZXJDb29yIC0gMSA9PT0gdGhpcy54UG9zICYmIHlEYW5nZXJDb29yICsgMCA9PT0gdGhpcy55UG9zKSB0aGlzLmRhbmdlcnNOZWFyKys7XG4gICAgaWYgKHhEYW5nZXJDb29yICsgMSA9PT0gdGhpcy54UG9zICYmIHlEYW5nZXJDb29yICsgMSA9PT0gdGhpcy55UG9zKSB0aGlzLmRhbmdlcnNOZWFyKys7XG4gICAgaWYgKHhEYW5nZXJDb29yICsgMCA9PT0gdGhpcy54UG9zICYmIHlEYW5nZXJDb29yICsgMSA9PT0gdGhpcy55UG9zKSB0aGlzLmRhbmdlcnNOZWFyKys7XG4gICAgaWYgKHhEYW5nZXJDb29yICsgMSA9PT0gdGhpcy54UG9zICYmIHlEYW5nZXJDb29yIC0gMSA9PT0gdGhpcy55UG9zKSB0aGlzLmRhbmdlcnNOZWFyKys7XG4gICAgaWYgKHhEYW5nZXJDb29yICsgMSA9PT0gdGhpcy54UG9zICYmIHlEYW5nZXJDb29yIC0gMCA9PT0gdGhpcy55UG9zKSB0aGlzLmRhbmdlcnNOZWFyKys7XG4gIH1cblxuICBpZiAodGhpcy5kYW5nZXJzTmVhciAhPT0gMCkge1xuICAgIGxldCBpc0FyZSA9IHRoaXMuZGFuZ2Vyc05lYXIgPT09IDEgPyAnaXMnIDogJ2FyZScsXG4gICAgICBkYW5nZXJzT3JTID0gdGhpcy5kYW5nZXJzTmVhciA9PT0gMSA/ICdkYW5nZXInIDogJ2RhbmdlcnMnXG5cbiAgICBvdXRwdXRUb1NjcmVlbihgVGhlcmUgJHsgaXNBcmUgfSAkeyB0aGlzLmRhbmdlcnNOZWFyIH0gJHsgZGFuZ2Vyc09yUyB9IG5lYXIgYnkuICBCZSBjYXJlZnVsIWApXG4gIH1cbn1cblxuUGxheWVyLnByb3RvdHlwZS5kaWUgPSBmdW5jdGlvbihkYW5nZXIpIHtcbiAgdGhpcy5kZWFkID0gdHJ1ZVxuICBpZiAodGhpcy5kZWFkKSB7XG4gICAgb3V0cHV0VG9TY3JlZW4oYCR7ZGFuZ2VyfSBZb3UgZGVhZCBicm8hYClcbiAgICBvdXRwdXRUb1NjcmVlbihgV2lsbCByZXN0YXJ0IG9uICR7IHdpbmRvdy5wbGF5R2FtZS5kaWZmaWN1bHR5IH0gZGlmZmljdWx0eWApXG5cbiAgICBpbml0R2FtZSh3aW5kb3cucGxheUdhbWUuZGlmZmljdWx0eSlcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBQbGF5ZXJcbiIsImNvbnN0IGRhbmdlcnMgPSBbXG4gICdZb3UgZmVsbCBvZmYgYSBjbGlmZi4gWWFob29vb29vb29vbyEg8J+RjfCfkYonLFxuICAn8J+QuvCfkLrwn5C6IEEgcGFjayBvZiB3b2x2ZXMgZ290IHlvdS4gIFlvdSBhcmUgbm90IE1vd2dsaT8g8J+QuvCfkLrwn5C6JyxcbiAgJ+KdhO+4jyBBIGJsaXp6YXJkIHRyYXBwZWQgeW91LiAgTm90IGZyb20gRGFpcnkgUXVlZW4uIOKdhO+4jycsXG4gICfwn5C7IEEgYmVhciBtYXVsZWQgeW91LiAgTm8gc2FmZXR5IHRoZXJlIScsXG4gICfwn5GjIFlvdSBzYXcgYmlnZm9vdD8/PycsXG4gICfwn5CnIEEgcGVuZ3VpbiBzcGVhcmVkIHlvdSB3aXRoIGl0cyBiZWFrLicsXG4gICfwn5GFIEEgbW9vc2UgbGlja2VkIGFuZCBsZWZ0IHlvdSBpbiBpdHMgdHJhY2tzLicsXG4gICdBIHJlaW5kZWVyIHJhbiBvdmVyIHlvdS4nLFxuICAn4pyJ77iPIEFuIGVtYWlsIHNvYXJlZCBvdXQgb2YgdGhlIHNreSBhbmQgc21hY2tlZCB5b3UgaW4gdGhlIGhlYWQuJyxcbiAgJ1lvdXIgcGl6emEg8J+NlSBmcm96ZSDinYTvuI8uICBZb3UgaGF2ZSBub3RoaW5nIHRvIGVhdCEnLFxuICAnRGVhZHBvb2wgcG9wcGVkIG91dCBmcm9tIGJlaGluZCBhIHRyZWUgYW5kIHN0YWJiZWQgeW91LiDimpQnLFxuICAnWW91IGdvdCBzaWNrIHdpdGggYSBjb2xkLiDwn6SSJ1xuXVxuXG5leHBvcnQgZGVmYXVsdCBkYW5nZXJzXG4iLCJpbXBvcnQgUGxheWVyIGZyb20gJy4vUGxheWVyLmpzJ1xuaW1wb3J0IG91dHB1dFRvU2NyZWVuIGZyb20gJy4vb3V0cHV0VG9TY3JlZW4uanMnXG5pbXBvcnQgZGFuZ2VycyBmcm9tICcuLi9leHQvZGFuZ2Vycy5qcydcbmltcG9ydCBpbml0R2FtZSBmcm9tICcuL0luaXRHYW1lLmpzJ1xuXG5mdW5jdGlvbiBHYW1lKGdhbWVTZXR0aW5ncykge1xuICB0aGlzLm1hcERpc3BsYXkgPSBbXVxuICB0aGlzLnBsYXllciA9IG5ldyBQbGF5ZXIoe1xuICAgIHlQbGF5ZXJTdGFydDogZ2FtZVNldHRpbmdzLnlQbGF5ZXJTdGFydCxcbiAgICB4UGxheWVyU3RhcnQ6IGdhbWVTZXR0aW5ncy54UGxheWVyU3RhcnQsXG4gICAgbGl2ZXM6IGdhbWVTZXR0aW5ncy5saXZlcyxcbiAgICBkZWFkOiBmYWxzZVxuICB9LCB0aGlzKVxuICB0aGlzLmRpZmZpY3VsdHkgPSBnYW1lU2V0dGluZ3MuZGlmZmljdWx0eVxuICB0aGlzLnlMZW5ndGggPSBnYW1lU2V0dGluZ3MueUxlbmd0aFxuICB0aGlzLnhMZW5ndGggPSBnYW1lU2V0dGluZ3MueExlbmd0aFxuICB0aGlzLmRhbmdlcnMgPSBbXVxuICB0aGlzLnN1c3BlY3RlZERhbmdlcnMgPSBbXVxuICB0aGlzLnlHb2FsID0gZ2FtZVNldHRpbmdzLnlHb2FsXG4gIHRoaXMueEdvYWwgPSBnYW1lU2V0dGluZ3MueEdvYWxcbiAgdGhpcy5udW1EYW5nZXJzID0gZ2FtZVNldHRpbmdzLm51bURhbmdlcnNcbn1cblxuLy9UT0RPIGNsZWFudXAgZnVuY3Rpb25cbkdhbWUucHJvdG90eXBlLmdlbk1hcCA9IGZ1bmN0aW9uKCkge1xuICBsZXQgdmlzTG9jID0gdGhpcy5wbGF5ZXIudmlzaXRlZExvY2F0aW9uc1xuICB0aGlzLm1hcERpc3BsYXkgPSBbXVxuXG4gIGZvciAobGV0IHkgPSAwOyB5IDwgdGhpcy55TGVuZ3RoOyB5KyspIHtcbiAgICB0aGlzLm1hcERpc3BsYXkucHVzaChbXSlcbiAgICBmb3IgKGxldCB4ID0gMDsgeCA8IHRoaXMueExlbmd0aDsgeCsrKSB7XG4gICAgICB0aGlzLm1hcERpc3BsYXlbeV0ucHVzaCgnTicpXG4gICAgfVxuICB9XG5cbiAgZm9yIChsZXQgc3VzcGVjdGVkIG9mIHRoaXMuc3VzcGVjdGVkRGFuZ2Vycykge1xuICAgIHRoaXMubWFwRGlzcGxheVtzdXNwZWN0ZWRbMV0gLSAxXVtzdXNwZWN0ZWRbMF0gLSAxXSA9ICc/J1xuICB9XG5cbiAgZm9yIChsZXQgeiBvZiB2aXNMb2MpIHtcbiAgICBsZXQgeExvYyA9IHpbMF0sXG4gICAgICB5TG9jID0gelsxXSxcbiAgICAgIGRhbmdlcnNDbG9zZUJ5ID0gMFxuXG4gICAgdGhpcy5tYXBEaXNwbGF5W3hMb2NdW3lMb2NdID0gJyonXG5cbiAgICBmb3IgKGxldCBkYW5nZXIgb2YgdGhpcy5kYW5nZXJzKSB7XG5cbiAgICAgIGxldCBkYW5nZXJDb29yID0gZGFuZ2VyLmRhbmdlckNvb3IsXG4gICAgICAgIHhWaXNpdCA9IHhMb2MsXG4gICAgICAgIHlWaXNpdCA9IHlMb2NcblxuICAgICAgaWYgKHhWaXNpdCArIDEgPT09IGRhbmdlckNvb3JbMF0gJiYgeVZpc2l0ICsgMSA9PT0gZGFuZ2VyQ29vclsxXSkgZGFuZ2Vyc0Nsb3NlQnkrKztcbiAgICAgIGlmICh4VmlzaXQgKyAxID09PSBkYW5nZXJDb29yWzBdICYmIHlWaXNpdCAtIDEgPT09IGRhbmdlckNvb3JbMV0pIGRhbmdlcnNDbG9zZUJ5Kys7XG4gICAgICBpZiAoeFZpc2l0ICsgMSA9PT0gZGFuZ2VyQ29vclswXSAmJiB5VmlzaXQgKyAwID09PSBkYW5nZXJDb29yWzFdKSBkYW5nZXJzQ2xvc2VCeSsrO1xuICAgICAgaWYgKHhWaXNpdCArIDAgPT09IGRhbmdlckNvb3JbMF0gJiYgeVZpc2l0ICsgMSA9PT0gZGFuZ2VyQ29vclsxXSkgZGFuZ2Vyc0Nsb3NlQnkrKztcbiAgICAgIGlmICh4VmlzaXQgLSAxID09PSBkYW5nZXJDb29yWzBdICYmIHlWaXNpdCArIDEgPT09IGRhbmdlckNvb3JbMV0pIGRhbmdlcnNDbG9zZUJ5Kys7XG4gICAgICBpZiAoeFZpc2l0IC0gMSA9PT0gZGFuZ2VyQ29vclswXSAmJiB5VmlzaXQgKyAwID09PSBkYW5nZXJDb29yWzFdKSBkYW5nZXJzQ2xvc2VCeSsrO1xuICAgICAgaWYgKHhWaXNpdCAtIDEgPT09IGRhbmdlckNvb3JbMF0gJiYgeVZpc2l0IC0gMSA9PT0gZGFuZ2VyQ29vclsxXSkgZGFuZ2Vyc0Nsb3NlQnkrKztcbiAgICAgIGlmICh4VmlzaXQgLSAwID09PSBkYW5nZXJDb29yWzBdICYmIHlWaXNpdCAtIDEgPT09IGRhbmdlckNvb3JbMV0pIGRhbmdlcnNDbG9zZUJ5Kys7XG5cbiAgICAgIGlmICh4VmlzaXQgPT09IGRhbmdlckNvb3JbMF0gJiYgeVZpc2l0ID09PSBkYW5nZXJDb29yWzFdKSB0aGlzLm1hcERpc3BsYXlbZGFuZ2VyQ29vclswXV1bZGFuZ2VyQ29vclsxXV0gPSAnWCc7XG4gICAgfVxuXG4gICAgaWYgKGRhbmdlcnNDbG9zZUJ5ID4gMCAmJiB0aGlzLm1hcERpc3BsYXlbeExvY11beUxvY10gIT09ICdYJykgdGhpcy5tYXBEaXNwbGF5W3hMb2NdW3lMb2NdID0gZGFuZ2Vyc0Nsb3NlQnlcbiAgfVxuXG4gIHRoaXMubWFwRGlzcGxheVt0aGlzLnBsYXllci54UG9zXVt0aGlzLnBsYXllci55UG9zXSA9ICcmJ1xuICB0aGlzLm1hcERpc3BsYXlbdGhpcy54R29hbF1bdGhpcy55R29hbF0gPSAnISEnXG5cbiAgaWYgKHRoaXMucGxheWVyLnhQb3MgPT09IHRoaXMueEdvYWwgJiYgdGhpcy5wbGF5ZXIueVBvcyA9PT0gdGhpcy55R29hbCkge1xuICAgIG91dHB1dFRvU2NyZWVuKCdZb3Ugd29uIHRoZSBnYW1lIScpXG4gICAgb3V0cHV0VG9TY3JlZW4oJ/CfmIQnKVxuICAgIG91dHB1dFRvU2NyZWVuKGBXaWxsIHJlc3RhcnQgb24gJHsgd2luZG93LnBsYXlHYW1lLmRpZmZpY3VsdHkgfSBkaWZmaWN1bHR5YClcblxuICAgIGluaXRHYW1lKHdpbmRvdy5wbGF5R2FtZS5kaWZmaWN1bHR5KVxuICB9XG59XG5cbkdhbWUucHJvdG90eXBlLmdlbkRhbmdlcnMgPSBmdW5jdGlvbigpIHtcblxuICBsZXQgZGFuZ2VyID0gMCxcbiAgICBkYW5nZXJzR2VuZXJhdGVkID0gW11cblxuICB3aGlsZSAoZGFuZ2VyIDw9IHRoaXMubnVtRGFuZ2Vycykge1xuICAgIGxldCByYW5YID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogdGhpcy55TGVuZ3RoKSArIDEsXG4gICAgICByYW5ZID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogdGhpcy54TGVuZ3RoKSArIDEsXG4gICAgICByYW5EYW5nZXIgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBkYW5nZXJzLmxlbmd0aCksXG4gICAgICBleGlzdHMgPSBmYWxzZVxuXG4gICAgZm9yIChsZXQgZGFuIG9mIGRhbmdlcnNHZW5lcmF0ZWQpIHtcbiAgICAgIGlmIChkYW5bMF0gPT09IHJhblggJiYgZGFuWzBdID09PSByYW5ZKVxuICAgICAgICBleGlzdHMgPSB0cnVlXG4gICAgfVxuXG4gICAgaWYgKCFleGlzdHMpIHtcbiAgICAgIHRoaXMuZGFuZ2Vycy5wdXNoKHtcbiAgICAgICAgZGFuZ2VyQ29vcjogW3JhblgsIHJhblldLFxuICAgICAgICBkYW5nZXI6IGRhbmdlcnNbcmFuRGFuZ2VyXVxuICAgICAgfSlcbiAgICAgIGRhbmdlcisrXG4gICAgfVxuICB9XG5cbiAgdGhpcy5wbGF5ZXIuaW5EYW5nZXIoKVxufVxuXG5leHBvcnQgZGVmYXVsdCBHYW1lXG4iLCJsZXQgZGlmZlJhbmdlcyA9IHtcbiAgZWFzeToge1xuICAgIGRpZmZpY3VsdHk6ICdlYXN5JyxcbiAgICB5TGVuZ3RoOiAxMCxcbiAgICB4TGVuZ3RoOiAxMCxcbiAgICB5UGxheWVyU3RhcnQ6IDAsXG4gICAgeFBsYXllclN0YXJ0OiAwLFxuICAgIHlHb2FsOiA4LFxuICAgIHhHb2FsOiA4LFxuICAgIG51bURhbmdlcnM6IDEyLFxuICAgIGxpdmVzOiA1XG4gIH0sXG4gIG1lZGl1bToge1xuICAgIGRpZmZpY3VsdHk6ICdtZWRpdW0nLFxuICAgIHlMZW5ndGg6IDEyLFxuICAgIHhMZW5ndGg6IDEyLFxuICAgIHlQbGF5ZXJTdGFydDogMSxcbiAgICB4UGxheWVyU3RhcnQ6IDEsXG4gICAgeUdvYWw6IDEwLFxuICAgIHhHb2FsOiAxMCxcbiAgICBudW1EYW5nZXJzOiAzMCxcbiAgICBsaXZlczogM1xuICB9LFxuICBoYXJkOiB7XG4gICAgZGlmZmljdWx0eTogJ2hhcmQnLFxuICAgIHlMZW5ndGg6IDE0LFxuICAgIHhMZW5ndGg6IDE0LFxuICAgIHlQbGF5ZXJTdGFydDogMixcbiAgICB4UGxheWVyU3RhcnQ6IDIsXG4gICAgeUdvYWw6IDEyLFxuICAgIHhHb2FsOiAxMixcbiAgICBudW1EYW5nZXJzOiA3MCxcbiAgICBsaXZlczogMVxuICB9LFxuICBsdWRpY3JvdXM6IHtcbiAgICBkaWZmaWN1bHR5OiAnbHVkaWNyb3VzJyxcbiAgICB5TGVuZ3RoOiAxNCxcbiAgICB4TGVuZ3RoOiAxNCxcbiAgICB5UGxheWVyU3RhcnQ6IDIsXG4gICAgeFBsYXllclN0YXJ0OiAyLFxuICAgIHlHb2FsOiAxMixcbiAgICB4R29hbDogMTIsXG4gICAgbnVtRGFuZ2VyczogNzAsXG4gICAgbGl2ZXM6IDFcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBkaWZmUmFuZ2VzXG4iLCJpbXBvcnQgR2FtZSBmcm9tICcuL0dhbWUuanMnXG5pbXBvcnQgZGlmZlJhbmdlcyBmcm9tICcuLi9leHQvZGlmZi5qcydcblxuZnVuY3Rpb24gaW5pdEdhbWUoZGlmZmljdWx0eSkge1xuICBsZXQgZ2FtZVNldHRpbmdzID0gZGlmZlJhbmdlc1tkaWZmaWN1bHR5XSxcbiAgICBnYW1lID0gbmV3IEdhbWUoZ2FtZVNldHRpbmdzKVxuXG4gIHdpbmRvdy5wbGF5R2FtZSA9IGdhbWVcbn1cblxuZXhwb3J0IGRlZmF1bHQgaW5pdEdhbWVcbiIsImltcG9ydCBvdXRwdXRUb1NjcmVlbiBmcm9tICcuL291dHB1dFRvU2NyZWVuLmpzJ1xuaW1wb3J0IGluaXRHYW1lIGZyb20gJy4vSW5pdEdhbWUuanMnXG5cbmNvbnN0IGNvbW1hbmRzID0gYFxuQXZhaWxhYmxlIGNvbW1hbmRzLlxuKioqQmFzaWMgQ29tbWFuZHNcblttXSAgICBTaG93IE1hcFxuW2hdICAgIEhpa2UgTW91bnRhaW4gKGV4YW1wbGUgY29tbWFuZCAnaCAyIDInKVxuW3NdICAgIE1hcmsgc3VzcGVjdGVkIGRhbmdlclxuW3JdICAgIFJlbWluZCBuZWFyYnkgZGFuZ2Vyc1xuW3BdICAgIFNob3cgY3VycmVudCBwb3NpdGlvblxuXG4qKipIZWxwIENvbW1hbmRzXG5bZ10gICAgU2hvdyBndWlkZVxuW2NdICAgIFNob3cgY29tbWFuZHMgYWdhaW5cbltsXSAgICBTaG93IExlZ2VuZFxuW2RdICAgIENoYW5nZSBkaWZmaWN1bHR5XG5gXG5cbmZ1bmN0aW9uIHZhbGlkYXRlQ29vcmRpbmF0ZXMoY29tbWFuZCkge1xuICBjb25zdCBudW1DaGVjayA9IC9cXGQrL2csXG4gICAgY29vcmRpbmF0ZXMgPSBjb21tYW5kLm1hdGNoKG51bUNoZWNrKSxcbiAgICB5ID0gK2Nvb3JkaW5hdGVzWzFdLFxuICAgIHggPSArY29vcmRpbmF0ZXNbMF1cblxuICBpZiAoIW51bUNoZWNrLnRlc3QoY29tbWFuZCkgfHwgY29vcmRpbmF0ZXMubGVuZ3RoICE9PSAyKSB7XG4gICAgb3V0cHV0VG9TY3JlZW4oJ0ludmFsaWQgY29vcmRpbmF0ZXMnKVxuICAgIG91dHB1dFRvU2NyZWVuKCdNdXN0IGJlIHR3byBudW1iZXJzJylcbiAgICByZXR1cm4gZmFsc2VcbiAgfVxuICBpZiAoeCA8IDEgfHwgeSA8IDEgfHwgeCA+IHBsYXlHYW1lLnhMZW5ndGggfHwgeSA+IHBsYXlHYW1lLnlMZW5ndGgpIHtcbiAgICBvdXRwdXRUb1NjcmVlbign8J+YlScpXG4gICAgb3V0cHV0VG9TY3JlZW4oJ011c3QgYmUgdmFsaWQgeCBhbmQgeSBjb29yZGluYXRlcycpXG4gICAgb3V0cHV0VG9TY3JlZW4oYE11c3QgaW5wdXQgY29vcmRpbmF0ZXMgKDEsMSkgdG8gKCR7IHBsYXlHYW1lLnhMZW5ndGggfSwkeyBwbGF5R2FtZS55TGVuZ3RoIH0pYClcbiAgICByZXR1cm4gZmFsc2VcbiAgfVxuXG4gIHJldHVybiBbeCwgeV1cbn1cblxuZXhwb3J0IGRlZmF1bHQge1xuXG4gIHAoKSB7XG4gICAgY29uc3QgcGxheWVyRGF0YSA9IHdpbmRvdy5wbGF5R2FtZS5wbGF5ZXJcblxuICAgIG91dHB1dFRvU2NyZWVuKGBZb3VyIGN1cnJlbnQgcG9zaXRpb24gaXMgKCR7IHBsYXllckRhdGEueVBvcyArIDEgfSwkeyBwbGF5ZXJEYXRhLnhQb3MgKyAxIH0pYClcbiAgfSxcblxuICBkKGxpbmUpIHtcbiAgICBjb25zdCBjb21tYW5kSXMgPSBsaW5lLnNwbGl0KCcgJyksXG4gICAgICBkaWZmaWN1bHR5U2V0dGluZ3MgPSBbJ2Vhc3knLCAnbWVkaXVtJywgJ2hhcmQnLCAnbHVkaWNyb3VzJ11cblxuICAgIGlmIChjb21tYW5kSXMubGVuZ3RoICE9PSAyIHx8ICFkaWZmaWN1bHR5U2V0dGluZ3MuaW5jbHVkZXMoY29tbWFuZElzWzFdKSkge1xuICAgICAgb3V0cHV0VG9TY3JlZW4oJ0ludmFsaWQgY29tbWFuZC4nKVxuICAgICAgcmV0dXJuXG4gICAgfVxuICAgIGluaXRHYW1lKGNvbW1hbmRJc1sxXSlcbiAgICBvdXRwdXRUb1NjcmVlbignR2FtZSBkaWZmaWN1bHR5IGNoYW5nZWQhJylcbiAgfSxcblxuICByKCkge1xuICAgIGxldCBwbGF5ZXJEYXRhID0gcGxheUdhbWUucGxheWVyLFxuICAgICAgaXNBcmUgPSBwbGF5ZXJEYXRhLmRhbmdlcnNOZWFyID09PSAxID8gJ2lzJyA6ICdhcmUnLFxuICAgICAgZGFuZ2VyT3JTID0gcGxheWVyRGF0YS5kYW5nZXJzTmVhciA9PT0gMSA/ICdkYW5nZXInIDogJ2RhbmdlcnMnLFxuICAgICAgY2FyZWZ1bCA9IHBsYXllckRhdGEuZGFuZ2Vyc05lYXIgPT09IDAgPyAnJzogJ0JlIGNhcmVmdWwhJ1xuXG4gICAgb3V0cHV0VG9TY3JlZW4oYFRoZXJlICR7IGlzQXJlIH0gJHsgcGxheWVyRGF0YS5kYW5nZXJzTmVhciB9ICR7IGRhbmdlck9yUyB9IG5lYXIgYnkuICAkeyBjYXJlZnVsIH1gKVxuICB9LFxuXG4gIHMoY29tbWFuZCkge1xuICAgIG91dHB1dFRvU2NyZWVuKCdNYXJraW5nIHN1c3BlY3RlZCBkYW5nZXIgb24gbWFwLi4uJylcbiAgICBsZXQgY29vcmRpbmF0ZXMgPSB2YWxpZGF0ZUNvb3JkaW5hdGVzKGNvbW1hbmQpXG4gICAgaWYgKGNvb3JkaW5hdGVzKSBwbGF5R2FtZS5zdXNwZWN0ZWREYW5nZXJzLnB1c2goY29vcmRpbmF0ZXMpXG4gICAgdGhpcy5tKClcbiAgfSxcblxuICBnKCkge1xuICAgIG91dHB1dFRvU2NyZWVuKGBcblxuICAvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuICAgICAgICBXZWxjb21lIHRvIFNub3dFZGdlIVxuICAvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXG4gIFlvdSBhcmUgYSBkYXJpbmcgZXhwbG9yZXIuICBZb3UgZGVjaWRlZCB0byBzY2FsZVxuICBNb3VudCBEZW5hbGkgaW4gYSBzbm93IHN0b3JtISAgWW91IGZpbmQgeW91ciB3YXlcbiAgdG8gdGhlIHRvcCwgYnV0IGJlIGNhcmVmdWwhICBUaGVyZSBhcmUgZGFuZ2Vyc1xuICBhbG9uZyB0aGUgd2F5LiAgWW91IHdpbGwgcmVjaWV2ZSBjdWVzIG9uIHlvdXJcbiAgbWFwIHdoZW4geW91IGFyZSBuZWFyIGRhbmdlciwgYnV0IHlvdSBtdXN0IG1ha2VcbiAgdGhlIHJpZ2h0IGNob2ljZSB3aGVyZSB0byBnbyFcblxuICBCZSBjYXJlZnVsIG9uIHRoaXMgZ3JlYXQgYWR2ZW50dXJvdXMgZW5kZWF2b3IhXG5cbiAgVGhlIG1hcCBpcyBhIDEwIHggMTAgZ3JpZCwgd2l0aCAoMCwwKSBzdGFydGluZ1xuICBpbiB0aGUgdG9wIGxlZnQgY29ybmVyLlxuXG4gICR7Y29tbWFuZHN9XG4gICAgICAgICAgICAgICAgICBgKVxuICB9LFxuXG4gIGMoKSB7XG4gICAgb3V0cHV0VG9TY3JlZW4oYCR7Y29tbWFuZHN9YClcbiAgfSxcblxuICBoKGNvbW1hbmQpIHtcbiAgICBvdXRwdXRUb1NjcmVlbignSGlraW5nIG1vdW50YWluLi4uJylcbiAgICBsZXQgY29vcmRpbmF0ZXMgPSB2YWxpZGF0ZUNvb3JkaW5hdGVzKGNvbW1hbmQpXG4gICAgaWYgKGNvb3JkaW5hdGVzKSBwbGF5R2FtZS5wbGF5ZXIubW92ZSgrY29vcmRpbmF0ZXNbMF0sICtjb29yZGluYXRlc1sxXSlcbiAgICB0aGlzLm0oKVxuICB9LFxuXG4gIGwoKSB7XG4gICAgb3V0cHV0VG9TY3JlZW4oYFxuXG4gIC8qKioqKiAgIE1BUCBMRUdFTkQgICAqKioqKi9cblxuICAqICcmJyAgICAgUGxheWVyIEljb25cbiAgKiAnTicgICAgIFVua25vd24gbG9jYXRpb25cbiAgKiAnKicgICAgIFZpc2l0ZWQgbG9jYXRpb24gd2l0aCBubyBkYW5nZXIuXG4gICogJ1gnICAgICBWaXNpdGVkIGxvY2F0aW9uIHdpdGgga25vd24gZGFuZ2VyLlxuICAqICc/JyAgICAgTG9jYXRpb24gd2l0aCBzdXNwZWN0ZWQgZGFuZ2VyLlxuXG4gICogTmVhcmJ5IGRhbmdlcnMgYXBwZWFyIGFzIGEgbnVtYmVyXG4gICAgICAqIGkuZS4gJzEnIG9yICcyJy5cbiAgICAgICAgICAgICAgYClcbiAgfSxcblxuICBtKCkge1xuXG4gICAgaWYgKHBsYXlHYW1lLmRpZmZpY3VsdHkgPT09ICdsdWRpY3JvdXMnKVxuICAgICAgcmV0dXJuIG91dHB1dFRvU2NyZWVuKCdNYXAgaXMgZGlzYWJsZWQgb24gbHVkaWNyb3VzIGRpZmZpY3VsdHkuJylcblxuICAgIHBsYXlHYW1lLmdlbk1hcCgpXG5cbiAgICBsZXQgbWFwT3V0U3RyaW5nID0gJydcbiAgICBmb3IgKGxldCByb3cgb2YgcGxheUdhbWUubWFwRGlzcGxheSkge1xuICAgICAgZm9yIChsZXQgY29sdW1uRGF0YSBvZiByb3cpIHtcbiAgICAgICAgbWFwT3V0U3RyaW5nICs9IGNvbHVtbkRhdGEgKyAnXFx0J1xuICAgICAgfVxuICAgICAgbWFwT3V0U3RyaW5nICs9ICdcXG4nXG4gICAgfVxuXG4gICAgdGhpcy5sKClcbiAgICBvdXRwdXRUb1NjcmVlbihtYXBPdXRTdHJpbmcpXG4gICAgdGhpcy5wKClcbiAgICB0aGlzLnIoKVxuICB9XG5cbn1cbiIsImltcG9ydCBjb21tYW5kcyBmcm9tICcuL21vZHVsZXMvY29tbWFuZHMuanMnXG5pbXBvcnQgSW5pdEdhbWUgZnJvbSAnLi9tb2R1bGVzL0luaXRHYW1lLmpzJ1xuaW1wb3J0IG91dHB1dFRvU2NyZWVuIGZyb20gJy4vbW9kdWxlcy9vdXRwdXRUb1NjcmVlbi5qcydcblxub3V0cHV0VG9TY3JlZW4oYOKdhO+4j+KdhO+4j+KdhO+4j+KdhO+4j+KdhO+4j+KdhO+4j+KdhO+4j+KdhO+4j+KdhO+4j+KdhO+4j+KdhO+4j+KdhO+4j+KdhO+4j+KdhO+4j+KdhO+4j+KdhO+4j+KdhO+4j+KdhO+4j+KdhO+4j+KdhO+4j+KdhO+4j+KdhO+4j+KdhO+4j2ApXG5vdXRwdXRUb1NjcmVlbihgWW91IGhhdmUgc3RhcnRlZCBTTk9XRURHRSBvbiBlYXN5IGRpZmZpY3VsdHkuYClcbm91dHB1dFRvU2NyZWVuKCdUeXBlIGBnYCB0byBzZWUgdGhlIGluc3RydWN0aW9ucycpXG5cbkluaXRHYW1lKCdlYXN5JylcblxucGxheUdhbWUuZ2VuTWFwKClcbnBsYXlHYW1lLmdlbkRhbmdlcnMoKVxuXG5kb2N1bWVudC5vbmtleWRvd24gPSBlID0+IHtcbiAgbGV0IGVudGVyS2V5ID0gZS5rZXlDb2RlLFxuICAgIGFjdGl2ZUVsZW1lbnQgPSBkb2N1bWVudC5hY3RpdmVFbGVtZW50LFxuICAgIGlucHV0QmFyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignaW5wdXRbdHlwZT1cInRleHRcIl0nKVxuXG4gIGlmIChlbnRlcktleSA9PT0gMTMgJiYgYWN0aXZlRWxlbWVudCA9PT0gaW5wdXRCYXIpIHtcbiAgICBjb25zdCBsaW5lID0gaW5wdXRCYXIudmFsdWUsXG4gICAgICBhdmFpbGFibGVDb21tYW5kcyA9IE9iamVjdC5rZXlzKGNvbW1hbmRzKSxcbiAgICAgIGdpdmVuSW5pdGlhbENvbW1hbmQgPSBsaW5lLmNoYXJBdCgwKVxuXG4gICAgaWYgKCFhdmFpbGFibGVDb21tYW5kcy5pbmNsdWRlcyhnaXZlbkluaXRpYWxDb21tYW5kKSlcbiAgICAgIG91dHB1dFRvU2NyZWVuKCdDb21tYW5kIG5vdCBmb3VuZCcpXG5cbiAgICBpbnB1dEJhci52YWx1ZSA9ICcnXG5cbiAgICBmb3IgKGxldCB2YWx1ZSBvZiBhdmFpbGFibGVDb21tYW5kcykge1xuICAgICAgbGV0IGNvbW1hbmQgPSB2YWx1ZVxuICAgICAgaWYgKGNvbW1hbmQgPT09IGdpdmVuSW5pdGlhbENvbW1hbmQpIGNvbW1hbmRzW2NvbW1hbmRdKGxpbmUpXG4gICAgfVxuICB9XG59XG4iXSwibmFtZXMiOlsib3V0cHV0IiwiZG9jdW1lbnQiLCJxdWVyeVNlbGVjdG9yIiwib3V0cHV0VG9TY3JlZW4iLCJ0ZXh0IiwidGV4dE5vZGUiLCJjcmVhdGVUZXh0Tm9kZSIsInBhcmFncmFwaE91dHB1dCIsImNyZWF0ZUVsZW1lbnQiLCJhcHBlbmRDaGlsZCIsInNjcm9sbEludG9WaWV3IiwiUGxheWVyIiwicGxheWVyRGF0YSIsImdhbWVPYmoiLCJsaXZlcyIsInhHYW1lU3RhcnQiLCJ4UGxheWVyU3RhcnQiLCJ5R2FtZVN0YXJ0IiwieVBsYXllclN0YXJ0IiwieFBvcyIsInlQb3MiLCJkZWFkIiwiZGFuZ2Vyc05lYXIiLCJ2aXNpdGVkTG9jYXRpb25zIiwicHJvdG90eXBlIiwidXBkYXRlVmlzaXRlZExvY2F0aW9ucyIsInB1c2giLCJnZW5NYXAiLCJtb3ZlIiwieSIsIngiLCJuZXdYcG9zIiwibmV3WXBvcyIsInhBYnMiLCJNYXRoIiwiYWJzIiwieUFicyIsImluRGFuZ2VyIiwiZGFuZ2VycyIsImRhbmdlciIsImRhbmdlckNvb3IiLCJkaWUiLCJoZWFydHNMZWZ0IiwiaSIsInhEYW5nZXJDb29yIiwieURhbmdlckNvb3IiLCJpc0FyZSIsImRhbmdlcnNPclMiLCJ3aW5kb3ciLCJwbGF5R2FtZSIsImRpZmZpY3VsdHkiLCJpbml0R2FtZSIsIkdhbWUiLCJnYW1lU2V0dGluZ3MiLCJtYXBEaXNwbGF5IiwicGxheWVyIiwieUxlbmd0aCIsInhMZW5ndGgiLCJzdXNwZWN0ZWREYW5nZXJzIiwieUdvYWwiLCJ4R29hbCIsIm51bURhbmdlcnMiLCJ2aXNMb2MiLCJzdXNwZWN0ZWQiLCJ6IiwieExvYyIsInlMb2MiLCJkYW5nZXJzQ2xvc2VCeSIsInhWaXNpdCIsInlWaXNpdCIsImdlbkRhbmdlcnMiLCJkYW5nZXJzR2VuZXJhdGVkIiwicmFuWCIsImZsb29yIiwicmFuZG9tIiwicmFuWSIsInJhbkRhbmdlciIsImxlbmd0aCIsImV4aXN0cyIsImRhbiIsImRpZmZSYW5nZXMiLCJlYXN5IiwibWVkaXVtIiwiaGFyZCIsImx1ZGljcm91cyIsImdhbWUiLCJjb21tYW5kcyIsInZhbGlkYXRlQ29vcmRpbmF0ZXMiLCJjb21tYW5kIiwibnVtQ2hlY2siLCJjb29yZGluYXRlcyIsIm1hdGNoIiwidGVzdCIsInAiLCJkIiwibGluZSIsImNvbW1hbmRJcyIsInNwbGl0IiwiZGlmZmljdWx0eVNldHRpbmdzIiwiaW5jbHVkZXMiLCJyIiwiZGFuZ2VyT3JTIiwiY2FyZWZ1bCIsInMiLCJtIiwiZyIsImMiLCJoIiwibCIsIm1hcE91dFN0cmluZyIsInJvdyIsImNvbHVtbkRhdGEiLCJJbml0R2FtZSIsIm9ua2V5ZG93biIsImVudGVyS2V5IiwiZSIsImtleUNvZGUiLCJhY3RpdmVFbGVtZW50IiwiaW5wdXRCYXIiLCJ2YWx1ZSIsImF2YWlsYWJsZUNvbW1hbmRzIiwiT2JqZWN0Iiwia2V5cyIsImdpdmVuSW5pdGlhbENvbW1hbmQiLCJjaGFyQXQiXSwibWFwcGluZ3MiOiI7OztFQUFBLElBQUlBLFNBQVNDLFNBQVNDLGFBQVQsQ0FBdUIsUUFBdkIsQ0FBYjs7RUFFQSxTQUFTQyxjQUFULENBQXdCQyxJQUF4QixFQUE4QjtFQUM1QixNQUFJQyxXQUFXSixTQUFTSyxjQUFULENBQXdCRixJQUF4QixDQUFmO0VBQUEsTUFDRUcsa0JBQWtCTixTQUFTTyxhQUFULENBQXVCLEtBQXZCLENBRHBCOztFQUdBRCxrQkFBZ0JFLFdBQWhCLENBQTRCSixRQUE1QjtFQUNBTCxTQUFPUyxXQUFQLENBQW1CRixlQUFuQjtFQUNBQSxrQkFBZ0JHLGNBQWhCO0VBQ0Q7O0VDTkQsU0FBU0MsTUFBVCxDQUFnQkMsVUFBaEIsRUFBNEJDLE9BQTVCLEVBQXFDO0VBQ25DLE9BQUtDLEtBQUwsR0FBYUYsV0FBV0UsS0FBeEI7RUFDQSxPQUFLQyxVQUFMLEdBQWtCSCxXQUFXSSxZQUE3QjtFQUNBLE9BQUtDLFVBQUwsR0FBa0JMLFdBQVdNLFlBQTdCO0VBQ0EsT0FBS0MsSUFBTCxHQUFZUCxXQUFXSSxZQUF2QjtFQUNBLE9BQUtJLElBQUwsR0FBWVIsV0FBV00sWUFBdkI7RUFDQSxPQUFLRyxJQUFMLEdBQVlULFdBQVdTLElBQXZCO0VBQ0EsT0FBS0MsV0FBTCxHQUFtQixDQUFuQjtFQUNBLE9BQUtULE9BQUwsR0FBZUEsT0FBZjtFQUNBLE9BQUtVLGdCQUFMLEdBQXdCLENBQ3RCLENBQUNYLFdBQVdJLFlBQVosRUFBMEJKLFdBQVdNLFlBQXJDLENBRHNCLENBQXhCO0VBR0Q7O0VBRURQLE9B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
