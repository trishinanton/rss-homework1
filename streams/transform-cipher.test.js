const TextTransformCipher = require('./transform-cipher')


describe('transform stream',()=>{
    let fn
    let message
    beforeEach(()=>{
        message = 'This'
        fn = jest.fn((message,cipher)=>message+1111)
    })

    test('should call callback', ()=>{
        const obj = new TextTransformCipher(fn)
        obj._transform('some string','etf8',()=>{})
        expect(fn).toBeCalled()
        expect(fn).toBeCalledTimes(1)
        expect(fn.mock.calls.length).toBe(1)
    });

    test('should fn work', ()=>{
        fn
            .mockReturnValueOnce('Qwerty')
            .mockReturnValue('42')

        expect(fn()).toBe('Qwerty')
        expect(fn()).toBe('42')
        expect(fn()).toBe('42')
    });
})