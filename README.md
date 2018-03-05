# SNOWEDGE
Text based Minesweeper-like maze game.

## Theme
You are a daring explorer.  You decided to scale Mount Denali in a snow storm!  You must find your way to the top, but be careful!  There are dangers along the way.  You will recieve cues on your map when you are near danger, but you must make the right choice where to go!

Be careful on this great adventurous endeavor! 

The map is a 2d grid, with (0,0) starting in the top left corner.

## Use Instructions
To start the game `node index.js easy` OR `node index.js medium` OR `node index.js hard`.

* Player icon is a `&`.
* Unknown location is a `N`.
* Visited location with no dangers is a `*`.
* Nearby dangers appear as a number i.e. `1` or `2`.

Available commands for game.
- `g`
  - Show guide
- `m`
  - Show Map
- `h {n} {n}`
  - Hike Mountain (example command `h 2 2`)
- `c`
  - Show commands again

## Wanted Features to add
- Add flare feature to preview areas on map.  More flares for harder and less for easy.
- Add visibility to see further than one by one on easy.  More visibility on easy and less on hard?
- Reset the dangers on the grid after a certain point of time?  Only resets on especially hard?
- No visible map on hard or especially hard difficulty?
- add rocks for obstacles in the game.
- lives have been added. be sure to change the map when live is lost an is relocated.
