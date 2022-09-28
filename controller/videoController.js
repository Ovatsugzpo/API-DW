const video = require('../model/Video')
class videoController{
    async video(req, res){
        video.SelectAllVideo().then(data=>{
            console.log(data)
            res.status(200).send({data})
        }).catch(err=>{
            res.status(400).send({err})
        })
    }
}

module.exports = new videoController