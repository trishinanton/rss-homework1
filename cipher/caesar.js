let {
    arr_en,arr_EN,
    TextInArray,
    receiveСipherOrDecodeText

} = require('./common')


const functionCaesarCipher = (message, cipher)=>{
    const originalArray = TextInArray(message)

    const findAllIndexInputArray = (inputArray, alphabetInRegister)=>{
        return inputArray.map(e=> alphabetInRegister.findIndex(a=> a===e))
    }
    const allIndexLowRegister = findAllIndexInputArray(originalArray, arr_en)
    const allIndexLowerRegister = findAllIndexInputArray(originalArray, arr_EN)


    const caesarCipher = (array)=>{
        return [...array].map((_,i,a)=>{
            if (!a[i+1]) return a[i]=array[0]
            return a[i]=array[i+1]
        })
    }
    const caesarDecode = (array)=>{
        return [...array].map((_,i,a)=>{
            if(!a[i-1]) return a[i] = array[0]
            return a[i] = array[i-1]
        })
    }

    const caesarCipherLowRegister = caesarCipher(arr_en)
    const caesarCipherLowerRegister = caesarCipher(arr_EN)

    const caesarDecodeLowRegister = caesarDecode(arr_en)
    const caesarDecodeLowerRegister = caesarDecode (arr_EN)

    const cipherText = receiveСipherOrDecodeText(originalArray,allIndexLowRegister,allIndexLowerRegister,caesarCipherLowRegister,caesarCipherLowerRegister);
    const decodeText = receiveСipherOrDecodeText(originalArray,allIndexLowRegister,allIndexLowerRegister,caesarDecodeLowRegister,caesarDecodeLowerRegister)

    if(cipher) return cipherText
    else return decodeText

}

module.exports = functionCaesarCipher