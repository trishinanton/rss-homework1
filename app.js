const fs = require('fs');
const { Transform } = require('stream');
const {pipeline} = require ('stream')
const process = require('process');

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




// readStream.on('data', (chunk)=>{
//     writeStream.write('\n---CHUNK START---\n');
//     writeStream.write(chunk)
//     writeStream.write('\n---CHUNK END---\n');
// })

// readStream.pipe(writeStream)

// const handleError = () => {
//     console.log('Error');
//     readStream.destroy();
//     writeStream.end('Finished with error ...');
// }

// readStream
//     .on('error', handleError)
//     .pipe(compressStream)
//     .pipe(writeStream)
//     .on('error', handleError)

// console.log(process.argv)


//Рабочая
//Cipher
class TextTransformCipher extends Transform {
    constructor(method) {
        super()
        this.method = method;
    }
    _transform(chunk, encoding, callback) {
        try {
            const message = this.method(chunk.toString(),'cipher')
            // this.push(resultString)
            callback(null, message);
            // console.log('TextTransformCipher')
        } catch (err) {
            callback(err);
        }
    }
}

//decode
class TextTransformDecode extends Transform {
    constructor(method) {
        super()
        this.method = method;
    }

    _transform(chunk, encoding, callback) {
        try {
             //const message = functionCaesarCipher(chunk.toString())
            const message = this.method(chunk.toString())
            // this.push(resultString)
            callback(null, message);
            // console.log('TextTransformDecode')
        } catch (err) {
            callback(err);
        }
    }
}

const pipelineFunction = (transformStream)=>{
    pipeline(
        readStream,
        // process.stderr.on('error', ()=>console.log('Please provide the correct path to the input file')),
        ...transformStream,
        writeStream,
        // process.stderr.on('error', ()=>console.log('Please provide the correct path to the output file')),
        (error) => {
            if (error){

            }else{
                // transformStream = []
                console.log(transformStream.length)
                console.log('finished')
            }
        }
    )
}
const pipelineWithoutParametrs = (transformStream)=>{
    pipeline(
        process.stdin,
        // process.stderr.on('error', ()=>console.log('err')),
        ...transformStream,
        process.stdout,
        // process.stderr.on('error', ()=>console.log('err')),
        (error) => {
            if (error){

            }else{
                console.log('finished process stdout')
            }
        }
    )
}

const input = process.argv
console.log(input)
if(input.findIndex( el=> el==='-c' | el === '--config' )){
    const index = input.findIndex( el=> el==='-c' | el === '--config' )
    const config = input[index+1]
    configArr = config.split('-')
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


//--------------------------------//
if (input.filter(el=>el === '-c' | el === '--config').length>1){
    process.exit(1)
}
if (input.filter(el=>el === '-i' | el === '--input').length>1){
    process.exit(1)
}
if (input.filter(el=>el === '-o' | el === '--output').length>1){
    process.exit(1)
}
//---------------------------------------//


console.log(inputFile)
console.log(outputFile)

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
            console.log('Please, enter correct config')
            return process.exit(1)
        }

    }
})

if (!inputFile && !outputFile) pipelineWithoutParametrs(transformStream)
else {
    fs.stat(inputFile.toString(), (err, stats) => {
        if (err) {
            console.log('Please provide the correct path to the input file')
            process.stderr
        }else{
            readStream = fs.createReadStream(inputFile.toString());
        }
    })
    fs.stat(outputFile.toString(), (err, stats) => {
        if (err) {
            console.log('Please provide the correct path to the output file')
            process.stderr
        }else{
            writeStream = fs.createWriteStream(outputFile.toString());
            pipelineFunction(transformStream)
        }
    })


}



