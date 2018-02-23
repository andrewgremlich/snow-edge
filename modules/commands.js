const commands = `
Available commands.
[m]    Show Map
[h]    Hike Mountain

[c]    Show commands again
`

function b(game) {
        console.log(`
                
/*********************************************/
      Welcome to SnowEdge!
/*********************************************/

You are a daring explorer.  You decided to scale 
Mount Denali in a snow storm!  You find your way 
to the top, but be careful!  There are dangers 
along the way.  You will recieve cues on your 
map when you are near danger, but you must make 
the right choice where to go!

Be careful on this great adventurous endeavor! 

(Note to developer -> this is very similar to Minesweeper!)

${commands}
                
                `)
}

function m(game) {
    let mapOutString = ''
    for (let row of game.mapDisplay) {
        for (let columnData of row) {
            mapOutString += columnData + '\t'
        }
        mapOutString += '\n'
    }
    process.stdout.write(mapOutString)
}

function c(game) {
    console.log(`${commands}`)   
}

function h(game, command) {
    console.log('Hiking mountain...')
    let hikeCommand = command.split(' ')
    if(hikeCommand.length !== 3) return
    game.player.move(+hikeCommand[1], +hikeCommand[2])
}

function e(game) {
    process.exit()
    console.log('Game is over. You dead bro!')
}

module.exports = {
    b,
    c,
    e,
    h,
    m
}
