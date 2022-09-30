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
async function Pastas() {
    /*try{*/
        /* let pastas = await fs.readdir(path.join('/', 'DW-Temps', 'doctor.who.S01')) */
        /*let pastas =  await fs.readdir('C:/Users/paulo/OneDrive/Documents/gusta/')*/
        /* pastas.forEach(async arquivo => {
            let caminho = 'C:/Users/paulo/OneDrive/Documents/gusta/'
            let ep = fs2.createReadStream(`${caminho}${arquivo}`) 
            let dadosEstaticos = fs2.statSync(`${caminho}/${arquivo}`)
            let obj = {
                ep: ep,
                dadosEstaticos: dadosEstaticos
            }
            console.log('O OBJETO', obj)
            return new Promise((resolve, reject) => {
                resolve(obj)
                
            })
        })
    }catch(err){
        console.log('deu erro aq boy', err)
        throw err
    } */
    try {
        let caminho = 'C:/Users/paulo/OneDrive/Documents/gusta/'
        let arquivo = await fs.readdir(caminho)
        let ep = fs2.createReadStream(`${caminho}${arquivo}`)
        let dadosEstaticos = fs2.statSync(`${caminho}${arquivo}`)
        let obj = {
            ep: ep,
            dadosEstaticos: dadosEstaticos
        }
        return obj
    }
    catch(err) {
        throw err
    }
    

}
async function expressStart(ep){
    return new Promise((resolve, reject)=>{
        axios.post('http://localhost:3300/video', {file: ep}, {headers:{
            "Content-Type": "multipart/form-data"
        }}).then(params =>{
    return new Promise((resolve, reject)=>{
        axios({ method: 'post', 
        url: 'http://localhost:3300/video', 
        data: {file:ep.ep},
        headers: {"content-type": "multipart/form-data"},
        maxContentLength: 100000000,
        maxBodyLength: 1000000000
        })
        .then(params =>{
            console.log('foi lol')
            resolve(params)
        }).catch(errou =>{
            reject(errou)
        })
    })
}
async function StartUploads() {
    try {
        let episodio = await Pastas()
        await expressStart(episodio)

    }
    catch(error){
        console.log(error)
    }
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