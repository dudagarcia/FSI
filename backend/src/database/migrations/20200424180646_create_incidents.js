
exports.up = function(knex) {
    return knex.schema.createTable('incidents', function (table){
        table.increments(); //chave primária que se auto incrementa
        table.string('title').notNullable();
        table.string('description').notNullable();
        table.decimal('value').notNullable();

        table.string('ong_id').notNullable();

        table.foreign('ong_id').references('id').inTable('ongs'); //criação da chave estrangeira
      });
};

exports.down = function(knex) {
    return knex.schema.dropTable('incidents');
};
