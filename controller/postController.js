const Post = require('../model/Post')
class postController{
    async uploadVideo (req, res){
        console.log(req.file)
        let {originalname: name, key, location: url=''} = req.file
        Post.PostVideo({name, url, key}).then(video =>{
            res.status(200).send({video})
        }).catch(err =>{
            res.status(400).send({err})
        })
    }
}

module.exports = new postController