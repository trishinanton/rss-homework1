const fs = require('fs');
const { Transform } = require('stream');
const {pipeline} = require ('stream')
const process = require('process');
const TextTransformCipher = require('./streams/transform-cipher')
const TextTransformDecode = require('./streams/transform-decode')
const pipelineFunction = require('./pipeline/with-params')
const pipelineWithoutParametrs = require ('./pipeline/without-params')


//declaration variables
let configArr
let inputFile
let outputFile
let transformStream = []
let readStream
let writeStream

const functionCaesarCipher = require('./cipher/caesar')
const functionAtbashCipher = require ('./cipher/atbash')
const functionRot8Cipher = require ('./cipher/rot-8')


const input = process.argv
console.log(input)

const findParamFromTerminal = ()=>{
    if(input.findIndex( el=> el==='-c' | el === '--config' )){
        const index = input.findIndex( el=> el==='-c' | el === '--config' )
        if(index !== -1) {
            const config = input[index+1]
            configArr = config.split('-')
            configArr.map(el=>{
                switch (el){
                    case 'C1':{
                        transformStream.push(new TextTransformCipher(functionCaesarCipher))
                        break;
                    }
                    case 'C0':{
                        transformStream.push(new TextTransformDecode(functionCaesarCipher))
                        break;
                    }
                    case 'A':{
                        transformStream.push(new TextTransformCipher(functionAtbashCipher))
                        break;
                    }
                    case 'R1':{
                        transformStream.push(new TextTransformCipher(functionRot8Cipher))
                        break;
                    }
                    case 'R0':{
                        transformStream.push(new TextTransformDecode(functionRot8Cipher))
                        break;
                    }
                    default:{
                        process.stderr.write(`Please,enter correct config`)
                        return process.exit(1)
                    }

                }
            })
        } else{
            // configArr = null
            process.stderr.write(`Please,enter param '-c' or '--config'`)
            process.exit(1)
        }

    }

    if(input.findIndex( el=> el==='-i' | el === '--input')){
        const indexInput = input.findIndex( el=> el==='-i' | el === '--input' )
        if(indexInput !==-1) inputFile = input[indexInput+1]
        else inputFile = null

    }

    if(input.findIndex( el=> el==='-o' | el === '--output')){
        const indexOutput = input.findIndex( el=> el==='-o' | el === '--output' )
        if(indexOutput !==-1) outputFile = input[indexOutput+1]
        else outputFile = null

    }
}
findParamFromTerminal()

const validationParamFromTerminal = ()=>{
    //--------------------------------//
    if (input.filter(el=>el === '-c' | el === '--config').length>1){
        process.stderr.write(`Please,enter one param '-c' or '--config'`)
        process.exit(1)
    }
    if (input.filter(el=>el === '-i' | el === '--input').length>1){
        process.stderr.write(`Please,enter one param '-i' or '--input'`)
        process.exit(1)
    }
    if (input.filter(el=>el === '-o' | el === '--output').length>1){
        process.stderr.write(`Please,enter one param '-o' or '--output'`)
        process.exit(1)
    }
//---------------------------------------//
}
validationParamFromTerminal()



console.log(inputFile)
console.log(outputFile)
console.log(configArr)


if (!inputFile && !outputFile) pipelineWithoutParametrs(transformStream)
else {
    fs.stat(inputFile.toString(), (err, stats) => {
        if (err) {
            process.stderr.write('Please provide the correct path to the input file')
            process.exit(1)
        }else{
            readStream = fs.createReadStream(inputFile.toString());
        }
    })
    fs.stat(outputFile.toString(), (err, stats) => {
        if (err) {
            process.stderr.write('Please provide the correct path to the output file')
            process.exit(1)
        }else{
            writeStream = fs.createWriteStream(outputFile.toString(),{flags:'a'});
            pipelineFunction(readStream,transformStream,writeStream)
        }
    })

}




