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
        let caminho = 'D:/DW-Temps/doctor.who.S01'
        let arquivo = await fs.readdir(caminho)
        let ep = fs2.createReadStream(`${caminho}/${arquivo}`)
        let dadosEstaticos = fs2.statSync(`${caminho}/${arquivo}`)
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