const fs = require('fs');
const { Transform } = require('stream');
const {pipeline} = require ('stream')

const readStream = fs.createReadStream('./docs/text.txt');
const writeStream = fs.createWriteStream('./docs/new-text.txt');
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
class TextTransformWithCaesarCipher extends Transform {
    _transform(chunk, encoding, callback) {
        try {
             const message = functionCaesarCipher(chunk.toString(),'cipher')
            // this.push(resultString)
            callback(null, message);
        } catch (err) {
            callback(err);
        }
    }
}
class TextTransformWithAtbashCipher extends Transform {
    _transform(chunk, encoding, callback) {
        try {
             const message = functionAtbashCipher(chunk.toString(),'cipher')
            // this.push(resultString)
            callback(null, message);
        } catch (err) {
            callback(err);
        }
    }
}
class TextTransformWithRot8Cipher extends Transform {
    _transform(chunk, encoding, callback) {
        try {
             const message = functionRot8Cipher(chunk.toString(),'cipher')
            // this.push(resultString)
            callback(null, message);
        } catch (err) {
            callback(err);
        }
    }
}

//decode
class TextTransformWithDecodeRot8 extends Transform {
    _transform(chunk, encoding, callback) {
        try {
             const message = functionRot8Cipher(chunk.toString())
            // this.push(resultString)
            callback(null, message);
        } catch (err) {
            callback(err);
        }
    }
}
class TextTransformWithDecodeAtbash extends Transform {
    _transform(chunk, encoding, callback) {
        try {
             const message = functionAtbashCipher(chunk.toString())
            // this.push(resultString)
            callback(null, message);
        } catch (err) {
            callback(err);
        }
    }
}
class TextTransformWithDecodeCaesar extends Transform {
    _transform(chunk, encoding, callback) {
        try {
             const message = functionCaesarCipher(chunk.toString())
            // this.push(resultString)
            callback(null, message);
        } catch (err) {
            callback(err);
        }
    }
}

const textTransformCaesarCipher = new TextTransformWithCaesarCipher();
const textTransformAtbashCipher = new TextTransformWithAtbashCipher();
const textTransformRot8Cipher = new TextTransformWithRot8Cipher();

const textDecodeRot8 = new TextTransformWithDecodeRot8()
const textDecodeAtbash = new TextTransformWithDecodeAtbash()
const textDecodeCaesar = new TextTransformWithDecodeCaesar()

const someCipher = (textTransformCipher)=>{
    pipeline(
        readStream,
        textTransformCipher,
        writeStream,
        (error) => {
            if (error) {
            } else {
                console.log('finished cipher')
            }
        }
    )
}
const someDecode = (textTransformDecode)=>{
    pipeline(
        readStream,
        textTransformDecode,
        writeStream,
        (error) => {
            if (error) {
            } else {
                console.log('finished decode')
            }
        }
    )
}

let configArr
const input = process.argv
console.log(input)
if(input.findIndex( el=> el==='-c' )){
    const index = input.findIndex( el=> el==='-c' )
    const config = input[index+1]

    configArr = config.split('-')
}

configArr.map(el=>{
    switch (el){
        case 'C1':{
            someCipher(textTransformCaesarCipher)
            break;
        }
        case 'C0':{
            someDecode(textDecodeCaesar)
            break;
        }
        case 'A1':{
            someCipher(textTransformAtbashCipher)
            break;
        }
        case 'A0':{
            someDecode(textDecodeAtbash)
            break;
        }
        case 'R1':{
            someCipher(textTransformRot8Cipher)
            break;
        }
        case 'R0':{
            someDecode(textDecodeRot8)
            break;
        }
        default:
            return undefined
    }
})


