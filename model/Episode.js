const knex = require('../database/knex')
class Episode {
    async SelectAllEps(){
        try{
            let data = await knex.select('*').where({SerieName:"Doctor-Who"}).from('post')
            return data
        }catch(err){
            throw err
        }
    }
    async SelectTemp(season){
        try {
            let data = await knex.select().where({temp:season, SerieName:"Doctor-Who"}).from('post')
            return data
        } catch (err) {
            throw err
        }
    }
    async SelectOneEp(ep, temp){
        try {
            let data = await knex.select().where({temp:temp, ep:ep, SerieName:"Doctor-Who"}).from('post')
            return data
        } catch (err) {
            throw err
        }
    }
    async SelectOneEpForSeason(ep){
        try {
            let data = await knex.select().where({ep:ep, SerieName:"Doctor-Who"}).from('post')
            return data
        } catch (err) {
            throw err
        }
    }
}
module.exports = new Episode