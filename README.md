# SNOWEDGE
Text based Minesweeper-like maze game. Play at this [website](https://andrewgremlich.github.io/snow-edge/)!

## Theme
You are a daring explorer.  You decided to scale Mount Denali in a snow storm!  You must find your way to the top, but be careful!  There are dangers along the way.  You will recieve cues on your map when you are near danger, but you must make the right choice where to go!

<<<<<<< HEAD
Be careful on this great adventurous endeavor! 

The map is a 2d grid, with (1, 1) starting in the top left corner.

## Download

1. Install [Nodejs from website](https://nodejs.org/en/ "Nodejs Website")
2. Git clone the project `https://github.com/andrewgremlich/snow-edge.git`
3. Open up terminal or command prompt and navigate to the location of the SNOWEDGE project.

## Use Instructions
To start the game `node index.js easy` OR `node index.js medium` OR `node index.js hard`.

### Legend

* Player icon is a `&`.
* Unknown location is a `N`.
* Visited location with no dangers is a `*`.
* Visited location with known dangers is a `X`.
* Nearby dangers appear as a number 
    * i.e. `1` or `2`.

Available commands for game.
- `g`
  - Show guide
- `m`
  - Show Map
- `h {x} {y}`
  - Hike Mountain (example command `h 2 2`)
  - Coordinate format can be about anything as long as there is an "h" and two numbers.
- `c`
  - Show commands again

## Wanted Features to add
- Add flare feature to preview areas on map.  More flares for harder and less for easy.
- Add visibility to see further than one by one on easy.  More visibility on easy and less on hard?
- No visible map on hard or especially hard difficulty?
- add rocks for obstacles in the game.
- mark suspected dangers
- change grid to letters and numbers
=======
Be careful on this great adventurous endeavor!

The map is a 2d grid, with (1, 1) starting in the top left corner.

### Legend

* '&'     Player Icon.
* '.'     Unknown location.
* '*'     Visited location with no danger
* 'X'     Visited location with known danger
* '?'     Location with suspected danger

Nearby dangers appear as a number
  * i.e. '1' or '2'.

### Available commands.

#### Basic Commands

* [m]    Show Map
* [h]    Hike Mountain (example command 'h 2 2')
* [s]    Mark suspected danger
* [r]    Remind nearby dangers
* [p]    Show current position

#### Help Commands

* [g]    Show guide
* [c]    Show commands again
* [l]    Show Legend
* [d]    Change difficulty
>>>>>>> 070393a04c64c0aaaa69f8d20730d0a060042ae0
