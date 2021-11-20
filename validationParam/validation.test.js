const validationParamFromTerminal = require('./validationParamFromTerminal')

describe('should correct validation param from terminal', ()=>{
    let fn
    let input = []
    let mockExit

    beforeEach(()=>{
        input = [
            '-c',
            'C0-C1',
            '-i',
            './docs/text.txt',
            '-o',
            'new-text.txt'
        ];
        mockExit = jest.spyOn(process, 'exit')
            .mockImplementation((number) => { throw new Error('process.exit: ' + number); });
    });
    afterEach(()=>{
        mockExit.mockRestore();
    })


    test(`should correct call process.exit then more one count param '-c' or '--config`, ()=>{
        input.push('-c')

        expect(() => {
            validationParamFromTerminal(input);
        }).toThrow();
        expect(mockExit).toHaveBeenCalledWith(1);

    });
    test(`should correct call process.stderr then more one count param '-c' or '--config`, ()=>{
        input.push('-c')

        const mockStderr = jest.spyOn(console, 'error')

        expect(() => {
            validationParamFromTerminal(input);
        }).toThrow();

        expect(mockStderr).toHaveBeenCalledWith(`Please,enter one param '-c' or '--config'`);
    });

    test(`should correct call process.exit then more one count param '-i' or '--input`, ()=>{
        input.push('-i')

        expect(() => {
            validationParamFromTerminal(input);
        }).toThrow();
        expect(mockExit).toHaveBeenCalledWith(1);

    });
    test(`should correct call process.stderr then more one count param '-i' or '--input`, ()=>{
        input.push('-i')

        const mockStderr = jest.spyOn(console, 'error')

        expect(() => {
            validationParamFromTerminal(input);
        }).toThrow();

        expect(mockStderr).toHaveBeenCalledWith(`Please,enter one param '-i' or '--input'`);
    });
    test(`should correct call process.exit then more one count param '-o' or '--output`, ()=>{
        input.push('-o')

        expect(() => {
            validationParamFromTerminal(input);
        }).toThrow();
        expect(mockExit).toHaveBeenCalledWith(1);

    });
    test(`should correct call process.stderr then more one count param '-o' or '--output`, ()=>{
        input.push('-i')

        const mockStderr = jest.spyOn(console, 'error')

        expect(() => {
            validationParamFromTerminal(input);
        }).toThrow();

        expect(mockStderr).toHaveBeenCalledWith(`Please,enter one param '-o' or '--output'`);
    });
})