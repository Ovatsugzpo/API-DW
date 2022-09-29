const axios = require('axios')
const fs = require('fs/promises')
const fs2 = require('fs')
const path = require('path')
const express = require('express')
async function arquivo (){
    try{
        let duto = await axios.get('http://localhost:3300/video')
        return duto
    }catch(err){
        throw err
    }
}
async function pastas() {
    try{
        let pastas = await fs.readdir(path.join('/', 'DW-Temps', 'doctor.who.S01'))
        pastas.forEach(async arquivo => {
            let caminho = path.resolve('/', 'DW-Temps', 'doctor.who.S01')
            let ep = fs2.createReadStream(`${caminho}/${arquivo}`)  
            let dadosEstaticos = fs2.statSync(`${caminho}/${arquivo}`)
            console.log(dadosEstaticos)
            return ep
        })
    }catch(err){
        throw err
    }
}
async function expressStart(ep){
    let fun = await axios.post('http://localhost:3300/video', {file: ep}, {headers:{
            "Content-Type": "multipart/form-data"
        }}).then(params =>{
            console.log(params)
        }).catch(errou =>{
            console.log(errou)
        })
    return fun
    /* return new Promise((resolve, reject)=>{
        axios.post('http://localhost:3300/video', {file: ep}, {headers:{
            "Content-Type": "multipart/form-data"
        }}).then(params =>{
            resolve(params)
        }).catch(errou =>{
            reject(errou)
        })
    }) */
}
async function StartUploads() {
    let episodio = await pastas()
    await expressStart(episodio)
}
StartUploads()

/*  
    fieldname: 'file',
    originalname: 'Gravar_2022_08_28_22_10_32_39.mp4',
    encoding: '7bit',
    mimetype: 'video/mp4',
    size: 2147231,
    bucket: 'amigitos-espanol-doctor-who',
    key: 'Gravar_2022_08_28_22_10_32_39-a68415fe3026784ea11c.mp4',
    acl: 'public-read',
    contentType: 'video/mp4',
    contentDisposition: null,
    contentEncoding: null,
    storageClass: 'STANDARD',
    serverSideEncryption: null,
    metadata: undefined,
    location: 'https://amigitos-espanol-doctor-who.s3.sa-east-1.amazonaws.com/Gravar_2022_08_28_22_10_32_39-a68415fe3026784ea11c.mp4',
    etag: '"a126cc466ae5eac0fc6c54bbad530cba"',
    versionId: undefined 
*/