exports.up = function(knex, Promise) {
  return knex.schema.createTable('clothes', function(table){
    table.increments('id').primary();
    table.string('clothing_item');
    table.integer('monkey_id').references('monkeys.id');
    table.timestamps();
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('clothes');
};
