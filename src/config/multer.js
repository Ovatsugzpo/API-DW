const multer = require("multer")
const path = require("path")
const crypto = require("crypto")
const multerS3 = require('multer-s3')
const aws = require('@aws-sdk/client-s3')

module.exports = {
    dest: path.resolve(__dirname, '..', '..', 'tmp', 'uploads'),
    storage: multerS3({
        s3: new aws.S3(),
        bucket: 'amigitos-espanol-doctor-who',  
        contentType: multerS3.AUTO_CONTENT_TYPE,
        acl: 'public-read',
        key: (req, file, cb)=>{
            crypto.randomBytes(4, (err, hash)=>{
                if (err){
                    cb(err)
                }
                let nome = file.originalname.split('.')
                let nome2 = nome.at(-1)

                
                const fileName = `DoctorWho_#${hash.toString('hex')}.${nome2}`
                file.originalname = fileName    
                cb(null, fileName)
            })
        }
    }),
    filename: (req, file, cb)=>{
        crypto.randomBytes(4, (err, hash)=>{
            if (err){
                cb(err)
            }
            let nome = file.originalname.split('.')
            let nome1 = nome[0]
            let nome2 = nome[1]

            
            file.key = `${nome1}-${hash.toString('hex')}.${nome2}`
            cb(null, file.key)
        })
    }, 
    limits:{
        FileSize: 1*1024*1024*1024*1024 
    },
    fileFilter: (req, file, cb)=>{ 
        const allowedMimes = [
            'video/mp4', 'video/MP4',
            'video/m4a', 'video/M4A',
            'video/avi', 'video/AVI',
            'video/mkv', 'video/MKV',
            'multipart/form-data'
        ]
        if (allowedMimes.includes(file.mimetype)){
            cb(null, true)
        }else{
            cb(new Error('tipo de arquivo invalido'))
        }
    }
}