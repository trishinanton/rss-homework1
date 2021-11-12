const {
    arr_en,arr_EN,
    findAllIndexInputArray,
    receiveСipherOrDecodeText,
    TextInArray,
    allIndexLowRegister,
    allIndexLowerRegister,
    originalArray
} = require('./common')

const functionRot8Cipher = (message, cipher) =>{
    const originalArray = TextInArray(message)

    //
    const findAllIndexInputArray = (inputArray, alphabetInRegister)=>{
        return inputArray.map(e=> alphabetInRegister.findIndex(a=> a===e))
    }
    const allIndexLowRegister = findAllIndexInputArray(originalArray, arr_en)
    const allIndexLowerRegister = findAllIndexInputArray(originalArray, arr_EN)
    //

    const rot8Cipher = (array)=>{
        return [...array].map((_,i,a)=>{
            if (!a[i+8]) return a[i]=array[i-8]
            return a[i]=a[i+8]
        })
    }
    const rot8CipherLowRegister = rot8Cipher(arr_en)
    const rot8CipherLowerRegister = rot8Cipher(arr_EN)


    const cipherText = receiveСipherOrDecodeText(originalArray,allIndexLowRegister,allIndexLowerRegister,rot8CipherLowRegister,rot8CipherLowerRegister);
    const cipherArray = TextInArray(cipherText);
    const decodeText = receiveСipherOrDecodeText(cipherArray,allIndexLowRegister,allIndexLowerRegister,arr_en,arr_EN)

    // console.log(cipherText)
    // console.log(decodeText)

    if(cipher) return cipherText
    else return decodeText
}

module.exports = functionRot8Cipher