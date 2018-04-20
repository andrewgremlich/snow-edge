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
            for (var i = 0; i < this.lives; i++) {
              outputToScreen('💜');
            }
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
    //TODO this.player probably needs a .apply call...
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

  var commands = '\nAvailable commands.\n***Basic Commands\n[g]    Show guide\n[m]    Show Map\n[h]    Hike Mountain (example command \'h 2 2\')\n\n***Utility Commands\n[s]    Mark suspected danger\n[r]    Remind nearby dangers\n\n***Help Commands\n[c]    Show commands again\n[l]    Show Legend\n[d]    Change difficulty\n';

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

  function h(command) {

    outputToScreen('Hiking mountain...');

    var coordinates = validateCoordinates(command);
    if (coordinates) playGame.player.move(+coordinates[0], +coordinates[1]);
    m();
  }

  function s(command) {
    outputToScreen('Marking suspected danger on map...');
    var coordinates = validateCoordinates(command);
    if (coordinates) playGame.suspectedDangers.push(coordinates);
    m();
  }

  function l() {
    outputToScreen('\n\n/*****   MAP LEGEND   *****/\n\n* \'&\'     Player Icon\n* \'N\'     Unknown location\n* \'*\'     Visited location with no danger.\n* \'X\'     Visited location with known danger.\n* \'?\'     Location with suspected danger.\n\n* Nearby dangers appear as a number\n    * i.e. \'1\' or \'2\'.\n            ');
  }

  function g() {
    outputToScreen('\n\n/*********************************************/\n      Welcome to SnowEdge!\n/*********************************************/\n\nYou are a daring explorer.  You decided to scale\nMount Denali in a snow storm!  You find your way\nto the top, but be careful!  There are dangers\nalong the way.  You will recieve cues on your\nmap when you are near danger, but you must make\nthe right choice where to go!\n\nBe careful on this great adventurous endeavor!\n\nThe map is a 10 x 10 grid, with (0,0) starting\nin the top left corner.\n\n' + commands + '\n                ');
  }

  function m() {

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

    outputToScreen(mapOutString);
  }

  function c() {
    outputToScreen('' + commands);
  }

  function r() {
    var playerData = playGame.player,
        isAre = playerData.dangersNear === 1 ? 'is' : 'are',
        dangerOrS = playerData.dangersNear === 1 ? 'danger' : 'dangers';

    outputToScreen('There ' + isAre + ' ' + playerData.dangersNear + ' ' + dangerOrS + ' near by.  Be careful!');
  }

  function r() {
    var playerData = playGame.player,
        isAre = playerData.dangersNear === 1 ? 'is' : 'are',
        dangerOrS = playerData.dangersNear === 1 ? 'danger' : 'dangers';

    outputToScreen('There ' + isAre + ' ' + playerData.dangersNear + ' ' + dangerOrS + ' near by.  Be careful!');
  }

  function d(line) {
    var commandIs = line.split(' '),
        difficultySettings = ['easy', 'medium', 'hard', 'ludicrous'];

    if (commandIs.length !== 2 || !difficultySettings.includes(commandIs[1])) {
      outputToScreen('Invalid command.');
      return;
    }
    initGame(commandIs[1]);
    outputToScreen('Game difficulty changed!');
  }

  var commands$1 = {
    d: d,
    r: r,
    s: s,
    g: g,
    c: c,
    h: h,
    l: l,
    m: m
  };

  var difficulty = 'easy';

  outputToScreen('\u2744\uFE0F\u2744\uFE0F\u2744\uFE0F\u2744\uFE0F\u2744\uFE0F\u2744\uFE0F\u2744\uFE0F\u2744\uFE0F\u2744\uFE0F\u2744\uFE0F\u2744\uFE0F\u2744\uFE0F\u2744\uFE0F\u2744\uFE0F\u2744\uFE0F\u2744\uFE0F\u2744\uFE0F\u2744\uFE0F\u2744\uFE0F\u2744\uFE0F\u2744\uFE0F\u2744\uFE0F\u2744\uFE0F');

  var inputer = document.querySelector('input[type="text"]'),
      blinkingCaret = document.querySelector('.blinking-caret');

  outputToScreen('You have started SNOWEDGE on ' + difficulty + ' difficulty.');
  outputToScreen('Type `guide` to see the instructions');

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
