const {pipeline} = require ('stream')
const process = require('process');

const pipelineWithoutParametrs = (transformStream)=>{
    pipeline(
        process.stdin,
        ...transformStream,
        process.stdout,
        (error) => {
            if (error){

            }else{
                console.log('finished process stdout')
            }
        }
    )
}

module.exports = pipelineWithoutParametrs