const Post = require('../model/Post')
class postController{
    async uploadEpisode (req, res){
        let {ep, temp} = req.body 
        let {location: url='', key, originalname: nome} = req.file
        let amazonFront = await Post.ChangeLocation(url)
        Post.PostVideo({nome, url, key, ep, temp, amazonFront}).then(video =>{
            res.status(200).send({video})
        }).catch(err =>{
            res.status(400).send({err})
        })
    }
}

module.exports = new postController