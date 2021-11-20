const fs = require('fs').promises;
const CheckInputFile = (inputFile)=>{
    console.log(inputFile)
    return fs.stat(inputFile.toString())
        .then(data=>{
            console.log('Correct path')
        })
        .catch(err=>{
            process.stderr.write('Please provide the correct path to the input file')
            console.error('Please provide the correct path to the input file')
            process.exit(1)
        })

}

module.exports = CheckInputFile