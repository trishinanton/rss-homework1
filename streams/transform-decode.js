const { Transform } = require('stream');

class TextTransformDecode extends Transform {
    constructor(method) {
        super()
        this.method = method;
    }

    _transform(chunk, encoding, callback) {
        try {
            const message = this.method(chunk.toString())
            // this.push(resultString)
            callback(null, message);
        } catch (err) {
            callback(err);
        }
    }
}

module.exports = TextTransformDecode