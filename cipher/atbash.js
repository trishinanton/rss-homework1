const {
    arr_en,arr_EN,
    findAllIndexInputArray,
    receiveСipherOrDecodeText,
    TextInArray,
    allIndexLowRegister,
    allIndexLowerRegister,
    originalArray
} = require('./common')

const functionAtbashCipher = (message, cipher)=>{
    const originalArray = TextInArray(message)

    //
    const findAllIndexInputArray = (inputArray, alphabetInRegister)=>{
        return inputArray.map(e=> alphabetInRegister.findIndex(a=> a===e))
    }
    const allIndexLowRegister = findAllIndexInputArray(originalArray, arr_en)
    const allIndexLowerRegister = findAllIndexInputArray(originalArray, arr_EN)
    //

    const atbashCipher = (array)=>{
        return [...array].reverse()
    }
    const atbashCipherLowRegister = atbashCipher(arr_en)
    const atbashCipherLowerRegister = atbashCipher(arr_EN)


    const cipherText = receiveСipherOrDecodeText(originalArray,allIndexLowRegister,allIndexLowerRegister,atbashCipherLowRegister,atbashCipherLowerRegister);
    const cipherArray = TextInArray(cipherText);
    const decodeText = receiveСipherOrDecodeText(cipherArray,allIndexLowRegister,allIndexLowerRegister,arr_en,arr_EN)

    // console.log(cipherText)
    // console.log(decodeText)
    if(cipher) return cipherText
    else return decodeText
}

module.exports = functionAtbashCipher

