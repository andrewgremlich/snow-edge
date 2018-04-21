# SNOWEDGE
Text based Minesweeper-like maze game. Play at this [website](https://andrewgremlich.github.io/snow-edge/)!

## Theme
You are a daring explorer.  You decided to scale Mount Denali in a snow storm!  You must find your way to the top, but be careful!  There are dangers along the way.  You will recieve cues on your map when you are near danger, but you must make the right choice where to go!

Be careful on this great adventurous endeavor!

The map is a 2d grid, with (1, 1) starting in the top left corner.

## Download


## Use Instructions
Use the following for the different levels of difficulty in the game.
```
node index.js easy
node index.js medium
node index.js hard
```

Note, if the difficulty level is omitted the game will default to easy.

### Legend

'&'     Player Icon.
'N'     Unknown location.
'*'     Visited location with no danger.
'X'     Visited location with known danger.
'?'     Location with suspected danger.

Nearby dangers appear as a number
  * i.e. '1' or '2'.

### Available commands.

#### Basic Commands

[m]    Show Map
[h]    Hike Mountain (example command 'h 2 2')
[s]    Mark suspected danger
[r]    Remind nearby dangers
[p]    Show current position

#### Help Commands

[g]    Show guide
[c]    Show commands again
[l]    Show Legend
[d]    Change difficulty
