let mapGenerator = require('./mapGenerator.js')

    
module.exports = {
    'start': (mapArray) => {
        console.log(`
                
/**********************************/
      Welcome to Snow Edge!
/**********************************/

This is a text-based RPG game where
you explore the side of Mount 
Denali.  

Available commands.
[m]    Show Map
[p]    Show Possessions
[g]    Move on Map
                
                `)
    },
    'm': (mapArray) => {
        mapGenerator(mapArray)
    },
    'end': (mapArray) => {
        console.log('Game is over. You dead bro!')
    }
}
