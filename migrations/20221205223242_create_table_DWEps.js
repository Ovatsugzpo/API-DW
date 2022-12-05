/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('DWEps', table=>{
        table.increments('id', 10).primary()
        table.string('SerieName', 50).notNullable().defaultTo('Doctor-Who')
        table.string('nome', 100).notNullable().defaultTo('')
        table.string('url', 250).notNullable().defaultTo('')
        table.integer('temp', 10).notNullable().defaultTo('')
        table.integer('ep', 10).notNullable().defaultTo('')
        table.string('key', 250).notNullable().defaultTo('')
        table.string('amazonFront', 250).notNullable().defaultTo('')
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('DWEps')
};
