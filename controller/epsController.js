const episode = require('../model/Episode')
class epsController{
    async AllEpisodes(req, res){
        episode.SelectAllEps().then(data=>{
            console.log(data)
            res.status(200).send({data})
        }).catch(err=>{
            res.status(400).send({err})
        })
    }
    async AllTemps (req, res){
        episode.SelectAllEps().then(data=>{   
            let Dw = [[]]
            let proxTtemp
            for (let i = 0; i < data.length; i++) {
                let temp = data[i].temp
                if(i < data.length -1){proxTtemp = data[i+1].temp}
                if (temp != proxTtemp) {
                    Dw.push([])
                }
            }
            for (let y = 0; y < data.length; y++) {
                let temp = data[y].temp
                let tp = 0
                while (tp < Dw.length){
                    if (temp-1 == tp) {
                        Dw[tp].push(data[y])
                    }
                    if (temp > Dw.length) {
                        Dw.at(-1).push(data[y])
                        break
                    }
                    tp++
                }
            }
            

            res.status(200).send({Dw})
        }).catch(err=>{
            console.log(err)
            res.status(400).send({err})
        })
    }
    async ChooseEp(req, res){
        let {ep, temp} = req.params
        if (temp === undefined) {
            episode.SelectOneEpForSeason(ep).then(data=>{
                console.log(data)
                res.status(200).send({data})
            }).catch(err=>{
                res.status(400).send({err})
            })
        }else{
            if (!isNaN(ep) && !isNaN(temp)) {
                episode.SelectOneEp(ep, temp).then(data=>{
                    console.log(data)
                    res.status(200).send({data})
                }).catch(err=>{
                    res.status(400).send({err})
                })
            }else{
                res.status(400).send({err:"Ep/Season Invalid"})
            }
        }
    }
    async ChooseTemp(req, res){
        let temp = req.params.temp
        episode.SelectTemp(temp).then(data=>{
            console.log(data)
            res.status(200).send({data})
        }).catch(err=>{
            res.status(400).send({err})
        })
    }
}

module.exports = new epsController