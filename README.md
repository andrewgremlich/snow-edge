# SNOWEDGE
Text based Minesweeper-like maze game.

## Theme
You are a daring explorer.  You decided to scale Mount Denali in a snow storm!  You must find your way to the top, but be careful!  There are dangers along the way.  You will recieve cues on your map when you are near danger, but you must make the right choice where to go!

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
* Marked suspected location appears with a `?`.
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
- `s {x} {y}`
  - Mark suspected danger on grid
- `r`
  - Remind of nearby dangers
- `c`
  - Show commands again
- `l`
  - Show game legend.

## Wanted Features to add
- Add flare feature to preview areas on map.  More flares for harder and less for easy.
- add rocks for obstacles in the game.
- change grid to letters and numbers
- Convert to internet GUI
