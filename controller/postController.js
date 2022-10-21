const Post = require('../model/Post')
class postController{
    async uploadVideo (req, res){
        console.log(req.file)
        console.log(req.body.name)
        let {originalname: name, key, location: url=''} = req.file
        let {ep, temp} = req.body
        Post.PostVideo({name, url, key, ep, temp}).then(video =>{
            res.status(200).send({video})
        }).catch(err =>{
            res.status(400).send({err})
        })
    }
}

module.exports = new postController