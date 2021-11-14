const { Readable } = require('stream');
const fs = require('fs');

class ReadStream extends Readable{
    constructor(filename) {
        super();
        this.filename = filename;
        this.fd = null;
        this.count = 0
    }
    _read(n){

        fs.open(this.filename, (err,fd)=>{
            if(err){
                console.log(err);
            }else{
                this.fd = fd
                const buf = Buffer.alloc(n);
                fs.read(this.fd, buf,0,n,null,(err,bytesRead)=>{
                    if(err){
                        this.destroy(err);
                    }else{
                            if(this.count===0){
                                this.push(bytesRead > 0 ? buf.slice(0,bytesRead):null);
                                this.count++
                            }
                            else this.push(null)

                    }
                })

            }
        })

    }
    _destroy(err, callback){
        if(this.fd){
            fs.close(this.fd,(err)=>callback(err))
        }else{
            callback(err)
        }
    }
}


module.exports = {
    ReadStream
}


