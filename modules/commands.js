function begin(mapArray) {
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


Available commands.
[m]    Show Map
                
                `)
}

function m(mapArray) {
    let mapOutString = ''
    for (let row of mapArray) {
        for (let columnData of row) {
            mapOutString += columnData + '\t'
        }
        mapOutString += '\n'
    }
    process.stdout.write(mapOutString)
}

function end(mapArray) {
    process.exit()
    console.log('Game is over. You dead bro!')
}

module.exports = {
    begin,
    m,
    end
}
