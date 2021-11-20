const fs = require('fs');
const { Transform, Readable } = require('stream');
const {pipeline} = require ('stream')
const process = require('process');
const TextTransformCipher = require('./streams/transform-cipher')
const TextTransformDecode = require('./streams/transform-decode')
const pipelineFunction = require('./pipeline/with-params')
const pipelineWithoutParametrs = require ('./pipeline/without-params')
const {ReadStream} = require('./streams/custom-readable-stream')
const {WriteStream} = require ('./streams/custom-writable-stream')
const validationParamFromTerminal = require('./validationParam/validationParamFromTerminal')
const CheckInputFile = require('./checkFile/checkInputFile')

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
// console.log(input)

const findParamFromTerminal = (input)=>{
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
        }
    else{
            process.stderr.write(`Please,enter param '-c' or '--config'`)
            process.exit(1)
        }

    }
    console.log(input)

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
findParamFromTerminal(input)

validationParamFromTerminal(input)


// console.log(inputFile)
// console.log(outputFile)
// console.log(configArr)


const CheckOutputFile = (outputFile)=>{
    fs.stat(outputFile.toString(), (err, stats) => {
        if (err) {
            process.stderr.write('Please provide the correct path to the output file')
            process.exit(1)
        }else{

            // writeStream = fs.createWriteStream(outputFile.toString(),{flags:'a'});
            pipelineFunction(new ReadStream(inputFile.toString()),
                transformStream,
                new WriteStream(outputFile.toString(),'a'))
        }
    })
}

if (!inputFile && !outputFile) pipelineWithoutParametrs(transformStream)
else {
    CheckInputFile(inputFile)
    CheckOutputFile(outputFile)
}

module.exports={validationParamFromTerminal, findParamFromTerminal}




