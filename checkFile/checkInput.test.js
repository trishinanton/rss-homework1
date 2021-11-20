const CheckInputFile = require('./checkInputFile')
const fs = require('fs');

describe('check correct input file', ()=>{
    let mockExit
    let stat

    beforeEach(()=>{
        mockExit = jest.spyOn(process, 'exit')
            .mockImplementation((number) => { throw new Error('process.exit: ' + number); });
    });
    afterEach(()=>{
        mockExit.mockRestore();
    })
    test('should correct call process.exit',   ()=>{
        let inputFile = './docs/tex1t.txt'

            return CheckInputFile(inputFile)
                .catch(e=>{
                    expect(mockExit).toHaveBeenCalledWith(1);
                })
    });

    test('should pass correct input file',()=>{
        let inputFile = './docs/text.txt'

        const correctInput = jest.spyOn(console,'log')

        return CheckInputFile(inputFile)
            .then(data=>{
                expect(correctInput).toHaveBeenCalledWith('Correct path')
            })
    });

    test('should pass incorrect input file',()=>{
        let inputFile = './docs/tex1t.txt'
        const errInput = jest.spyOn(console, 'error')

        return CheckInputFile(inputFile)
            .catch(e=>{
                expect(errInput).toHaveBeenCalledWith('Please provide the correct path to the input file');
            })

    });

})