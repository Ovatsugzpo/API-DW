const knex = require('../database/knex')
class post {
    async PostVideo(data){
        let {name, url, key, Ep, Temp} = data
        try{
            let video = await knex.insert({nome:name, url, key, ep:Ep, temp: Temp}).into('post')
            return video
        }catch(err){
            throw err
        } 
    }
}
module.exports = new post