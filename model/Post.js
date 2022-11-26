const knex = require('../database/knex')
class post {
    async PostVideo(data){
        let {nome, url, key, ep, temp} = data
        try{
            let video = await knex.insert({nome, url, key, ep, temp}).into('post')
            return video
        }catch(err){
            throw err
        } 
    }
}
module.exports = new post