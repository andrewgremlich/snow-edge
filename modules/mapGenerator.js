module.exports = (input) => {

    let mapOutString = ''

    for (let row of input) {
        for (let columnData of row) {
            mapOutString += columnData + '\t'
        }
        mapOutString += '\n'
    }

    process.stdout.write(mapOutString)
}
