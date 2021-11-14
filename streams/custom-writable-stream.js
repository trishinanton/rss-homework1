const { Writable } = require('stream');
const fs = require('fs');

class WriteStream extends Writable {
    constructor(filename, flags) {
        super();
        this.filename = filename
        this.flags = flags
    }

    _write(chunk, encoding, callback) {
        fs.open(this.filename, this.flags, (err, fd)=>{
            if(err){
                console.log(err);
            } else {
                this.fd = fd
                fs.write(this.fd, chunk, callback);
            }
        })

    }
}

module.exports = {
    WriteStream
}