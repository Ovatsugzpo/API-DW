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
    try {
        let temp = await fs.readdir('D:/DW-Temps')
        let listEp = []
        for (let i = 1; i <= temp.length; i++) {
            try {
                let caminho = `D:/DW-Temps/doctor.who.S${i}`
                let arquivo = await fs.readdir(caminho)
                for (let j = 0; j < arquivo.length; j++) {
                    let CreatedMedia = fs2.createReadStream(`${caminho}/${arquivo[j]}`)
                    let dadosEstaticos = fs2.statSync(`${caminho}/${arquivo[j]}`)
                    let obj = {
                        CreatedMedia,
                        dadosEstaticos,
                    }
                    listEp.push(obj)
                }
            } catch (err) {
                throw err
            }
        }
        return listEp
    }
    catch(err) {
        throw err
    }
}
async function expressStart(ep){
    return new Promise((resolve, reject)=>{
        axios({ method: 'post', 
        url: 'http://localhost:3300/video',
        data: {file: ep.CreatedMedia},
        headers: {"content-type": "multipart/form-data"},
        maxContentLength: 100000000, 
        maxBodyLength: 1000000000
        })
        .then(params =>{
            console.log('foi lol')
            resolve(params)
        }).catch(err =>{
            reject(err)
        })
    })
}
async function StartUploads() {
    try {
        let episodio = await Pastas()
        for (let i = 0; i < episodio.length; i++) {
            await expressStart(episodio[i])
        }

    }
    catch(error){
        console.log(error)
    }
}
StartUploads()