const knex = require('../database/knex')
class Episode {
    async SelectAllEps(){
        try{
            let data = await knex.select('*').from('post')
            return data
        }catch(err){
            throw err
        }
    }
    async SelectTemp(season){
        try {
            let data = await knex.select().where({temp:season}).from('post')
            return data
        } catch (err) {
            throw err
        }
    }
    async SelectOneEp(ep, temp){
        try {
            let data = await knex.select().where({temp:temp, ep:ep}).from('post')
            return data
        } catch (err) {
            throw err
        }
    }
    async SelectOneEpForSeason(ep){
        try {
            let data = await knex.select().where({ep:ep}).from('post')
            return data
        } catch (err) {
            throw err
        }
    }
}
module.exports = new Episode