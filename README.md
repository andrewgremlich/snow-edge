# snow-edge
Text based Minesweeper-like maze game.

## Theme
You are a daring explorer.  You decided to scale Mount Denali in a snow storm!  You must find your way to the top, but be careful!  There are dangers along the way.  You will recieve cues on your map when you are near danger, but you must make the right choice where to go!

Be careful on this great adventurous endeavor! 

The map is a 10 x 10 grid, with (0,0) startingin the top left corner.

## Use Instructions
To start the game `node index.js easy` OR `node index.js medium` OR `node index.js hard`.

Player icon is a `&`.
Unknown location is a `N`.
Visited location with no dangers is a `*`.

Available commands to be typed into running process.
- `g`
  - Show guide
- `m`
  - Show Map
- `h {n} {n}`
  - Hike Mountain (example command `h 2 2`)
- `c`
  - Show commands again

## Wanted Features to add
- Add flare feature to preview areas on map.
- Add visibility to see further than one by one.
- Reset the dangers on the grid after a certain point of time?
- Fix grid system for developer don't get it backwards!
- No map on hard or especially hard difficulty?
- ****Show numbers of dangers close by
