let {
    arr_en,arr_EN,
    TextInArray,
    findAllIndexInputArray,
    receiveСipherOrDecodeText,
    allIndexLowRegister,
    allIndexLowerRegister,
    originalArray,
    message
} = require('./common')


const functionCaesarCipher = (message, cipher)=>{
    const originalArray = TextInArray(message)

    //
    const findAllIndexInputArray = (inputArray, alphabetInRegister)=>{
        return inputArray.map(e=> alphabetInRegister.findIndex(a=> a===e))
    }
    const allIndexLowRegister = findAllIndexInputArray(originalArray, arr_en)
    const allIndexLowerRegister = findAllIndexInputArray(originalArray, arr_EN)
    //

    const caesarCipher = (array)=>{
        return [...array].map((_,i,a)=>{
            if (!a[i+1]) return a[i]=array[0]
            return a[i]=a[i+1]
        })
    }

    const caesarCipherLowRegister = caesarCipher(arr_en)
    const caesarCipherLowerRegister = caesarCipher(arr_EN)


    const cipherText = receiveСipherOrDecodeText(originalArray,allIndexLowRegister,allIndexLowerRegister,caesarCipherLowRegister,caesarCipherLowerRegister);
    const cipherArray = TextInArray(cipherText);
    const decodeText = receiveСipherOrDecodeText(cipherArray,allIndexLowRegister,allIndexLowerRegister,arr_en,arr_EN)

    // console.log(cipherText)
    // console.log(decodeText)
    if(cipher) return cipherText
    else return decodeText

}

module.exports = functionCaesarCipher