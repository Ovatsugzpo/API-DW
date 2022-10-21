const axios = require('axios')
const fs = require('fs/promises')
const fs2 = require('fs')
const path = require('path')
const knex = require('./database/knex')
const OrdemEps = require('./OrdenarEps')
const OrdemTemp = require('./OrdenarTemps')
async function arquivo (){
    try{
        let duto = await axios.get('http://localhost:3300/video')
        return duto
    }catch(err){
        throw err
    }
}
async function renameEp(path, temp, ep, extensao) {
    let nome = `DoctorWho_T${temp}-Ep${ep}${extensao}`
    await fs.rename(path, `D:/DW-Temps/doctor.who.S${temp}/${nome}`, (err)=>{
        if(err){throw err}
    })
}
async function Renomear() {
    try {
        let temp = await fs.readdir('D:/DW-Temps')
        let nuum2 = await OrdemTemp.pegarNumDoNome(temp)
        let temps = await OrdemTemp.ProprioSort(nuum2)
        for (let T = 0; T < temps.length; T++) {
            let caminho = `D:/DW-Temps/doctor.who.S${T+1}`
            let arquivo = await fs.readdir(caminho)
            console.log(arquivo)
            let nums = await OrdemEps.pegarNumDoNome(arquivo)
            let arquivo2 = await OrdemEps.ProprioSort(nums) 
            for (let E = 0; E < arquivo2.length; E++) {
                let path = `${caminho}/${arquivo2[E]}`
                let extensao = OrdemEps.pegarExtensao(arquivo2[E])
                await renameEp(path, T+1, E+1, extensao)
            }
        }
    } catch (err) {
        console.log(err)
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
                let nums = await Ordem.pegarNumDoNome(arquivo)
                let arquivo2 = await Ordem.ProprioSort(nums) 
                for (let j = 0; j < arquivo2.length; j++) {
                    let path = `${caminho}/${arquivo2[j]}`
                    let CreatedMedia = fs2.createReadStream(path)
                    let dadosEstaticos = fs2.statSync(path)
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
Renomear()