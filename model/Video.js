const knex = require('../database/knex')
class post {
    async SelectAllVideo(){
        try{
            let data = await knex.select('*').from('post')
            return data
        }catch(err){
            throw err
        }
    }
}
module.exports = new post