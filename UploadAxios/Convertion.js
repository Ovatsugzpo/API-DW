const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path
const ffmpegProbePath = require('@ffprobe-installer/ffprobe').path
const ffmpeg = require('fluent-ffmpeg')
ffmpeg.setFfmpegPath(ffmpegPath)
ffmpeg.setFfprobePath(ffmpegProbePath)
const fs = require('fs');
async function Converter(caminho){
    return new Promise((resolve, reject)=>{
        const process = ffmpeg(caminho)
        let newNome = caminho.split('/').at(-1).split('.')[0] + ".mp4"
        let dominio = caminho.split('DoctorWho')[0]
        let newPath = dominio + newNome
        process.format('mp4')
            .on('end', ()=>{ 
                fs.unlinkSync(caminho)
                resolve(newPath)
            })
            .on('progress', function (progress) {
                console.log(progress.frames);
              })
            .on('error', (err)=>{
                reject(err)
            })
            .save(newPath)
    })
}
module.exports = Converter