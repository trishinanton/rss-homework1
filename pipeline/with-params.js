const {pipeline} = require ('stream')

const pipelineFunction = (readStream,transformStream,writeStream)=>{
    pipeline(
        readStream,
        ...transformStream,
        writeStream,
        (error) => {
            if (error){

            }else{
                // console.log(transformStream.length)
                console.log('finished')
            }
        }
    )
}
module.exports = pipelineFunction