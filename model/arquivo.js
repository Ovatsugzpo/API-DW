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
        let ep2 = pastas.forEach(async arquivo => {
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
async function expressStart(ep2){
    return new Promise((resolve, reject)=>{
        axios.post('http://localhost:3300/video', {file: ep}, {headers:{
            "Content-Type": "multipart/form-data"
        }}).then(params =>{
            resolve(params)
        }).catch(errou =>{
            reject(errou)
        })
    })
}
async function StartUploads() {
    let episodio = await pastas()
    await expressStart(episodio)
}
StartUploads()