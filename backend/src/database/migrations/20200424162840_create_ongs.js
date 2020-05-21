exports.up = function(knex) {
  return knex.schema.createTable('ongs', function (table){
    table.string('id').primary(); //transforma em primary key //string para que seja um nº alto, gerado
    //pelo prg a fim de proteger a id de cada ong
    table.string('name').notNullable();
    table.string('email').notNullable();
    table.string('whatsapp').notNullable();
    table.string('city').notNullable();
    table.string('uf', 2).notNullable(); //2 é tamanho do texto a ser anexado
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('ongs');
};
