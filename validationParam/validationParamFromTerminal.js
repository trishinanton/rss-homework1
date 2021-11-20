

const validationParamFromTerminal = (input)=>{
    if (input.filter(el=>el === '-c' | el === '--config').length>1){
        process.stderr.write(`Please,enter one param '-c' or '--config'`)
        console.error(`Please,enter one param '-c' or '--config'`)
        process.exit(1)
    }
    if (input.filter(el=>el === '-i' | el === '--input').length>1){
        process.stderr.write(`Please,enter one param '-i' or '--input'`)
        console.error(`Please,enter one param '-i' or '--input'`)
        process.exit(1)
    }
    if (input.filter(el=>el === '-o' | el === '--output').length>1){
        process.stderr.write(`Please,enter one param '-o' or '--output'`)
        console.error(`Please,enter one param '-o' or '--output'`)
        process.exit(1)
    }
}

module.exports = validationParamFromTerminal