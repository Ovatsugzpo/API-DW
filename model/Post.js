const knex = require('../database/knex')
class post {
    async PostVideo(data){
        let {nome, url, key, ep, temp, amazonFront} = data
        try{
            let video = await knex.insert({nome, url, key, ep, temp, amazonFront}).into('post')
            return video
        }catch(err){
            throw err
        } 
    }
    async ChangeLocation(location){
        let novoLink = process.env.AWS_FRONT + location.split('/').at(-1)
        return novoLink
    }
}
module.exports = new post