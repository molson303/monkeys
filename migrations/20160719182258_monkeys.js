exports.up = function(knex, Promise) {
  return knex.schema.createTable('monkeys', function(table){
    table.increments('id').primary();
    table.string('name');
    table.integer('age');
    table.timestamps();
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('monkeys');
};
