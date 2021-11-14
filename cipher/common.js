
const arr_en = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
const arr_EN = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];


const TextInArray = (text)=>{
    return text.split('')
}

const receiveСipherText = (originalArray, allIndexLowRegister, allIndexLowerRegister, cipherLowRegister, cipherLowerRegister)=>{
    return originalArray.map((el,i,a)=> {
        if (el === el.toUpperCase()) {
            if(allIndexLowerRegister[i]===-1) return a[i]=a[i]
            return a[i] = cipherLowerRegister[allIndexLowerRegister[i]]
        } else {
            if(allIndexLowRegister[i]===-1) return a[i]=a[i]
            return a[i] = cipherLowRegister[allIndexLowRegister[i]]
        }
    }).join('')
}


module.exports={
    arr_en,
    arr_EN,
    receiveСipherOrDecodeText: receiveСipherText,
    TextInArray,

}