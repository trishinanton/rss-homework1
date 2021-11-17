const functionAtbashCipher = require('./atbash')
const functionCaesarCipher = require('./caesar')
const functionRot8Cipher = require('./rot-8')
const {TextInArray} = require('./common')

// beforeEach(()=>{
//     const message = 'This is secret. Message about "_" symbol!'
//     const cipher = 'cipher'
// })

const message = 'This is secret. Message about "_" symbol!'
const cipher = 'cipher'
const arr = [1,2,3]

describe('Atbash cipher-decode',()=>{

    test('should receive cipher atbash text', ()=>{
        let cipherText = functionAtbashCipher(message,cipher)
        expect(cipherText).toBe('Gsrh rh hvxivg. Nvhhztv zylfg "_" hbnylo!')
        expect(cipherText).toEqual('Gsrh rh hvxivg. Nvhhztv zylfg "_" hbnylo!')
    });
})
describe('Caesar cipher-decode',()=>{

    test('should receive cipher caesar text', ()=>{
        let cipherText = functionCaesarCipher(message,cipher)
        expect(cipherText).toBe('Uijt jt tfdsfu. Nfttbhf bcpvu "_" tzncpm!')
        expect(cipherText).toEqual('Uijt jt tfdsfu. Nfttbhf bcpvu "_" tzncpm!')
    });
    test('should receive decode caesar text', ()=>{
        let cipherText = functionCaesarCipher(message)
        expect(cipherText).toBe('Sghr hr rdbqds. Ldrrafd aants "_" rxlank!')
        expect(cipherText).toEqual('Sghr hr rdbqds. Ldrrafd aants "_" rxlank!')
    });
})
describe('Rot-8 cipher-decode',()=>{

    test('should receive cipher rot-8 text', ()=>{
        let cipherText = functionRot8Cipher(message,cipher)
        expect(cipherText).toBe('Bpqa qa amkzmb. Umaaiom ijwcb "_" agujwt!')
        expect(cipherText).toEqual('Bpqa qa amkzmb. Umaaiom ijwcb "_" agujwt!')
    });
    test('should receive decode rot-8 text', ()=>{
        let cipherText = functionRot8Cipher(message)
        expect(cipherText).toBe('Lzak ak kwujwl. Ewkksyw stgml "_" kqetgd!')
        expect(cipherText).toEqual('Lzak ak kwujwl. Ewkksyw stgml "_" kqetgd!')
    });
})

