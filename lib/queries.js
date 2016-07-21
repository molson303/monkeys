var knex = require('../db/knex');

module.exports = {

  allMonkeys: function() {
    return knex.raw(`SELECT monkeys.id AS id, monkeys.name AS name, monkeys.age AS age, clothes.clothing_item AS clothes FROM monkeys JOIN clothes ON clothes.monkey_id = monkeys.id`);
  },

  // allClothes: function(id) {
  //   return knex.raw(`SELECT * FROM clothes`)
  // },

  showMonkey: function(id) {
    return knex.raw(`SELECT * FROM monkeys WHERE id=${id}`);
  },

  // SELECT monkeys.id AS id, monkeys.name AS name, monkeys.age AS age, clothes.clothing_item AS clothes FROM monkeys JOIN clothes ON clothes.monkey_id = monkeys.id

  showClothes: function(id) {
    return knex.raw(`SELECT clothing_item FROM clothes WHERE id=${id}`);
  },


  addMonkey: function(monkey) {
    return knex.raw(`INSERT into monkeys values (DEFAULT, '${monkey.name}', ${monkey.age})`);
  },

  addClothes: function(clothes) {
    return knex.raw(`INSERT into clothes (clothing_item, monkey_id) values ('${clothes.clothes}', (SELECT MAX(id) FROM monkeys))`);
  },

//finish
  editMonkey: function(monkey, id) {
    return knex.raw(`UPDATE monkeys set name='${monkey.name}', age=${monkey.age} WHERE id=${id}`);
  },

  editClothes: function(clothes, id) {
    return knex.raw(`UPDATE clothes set clothing_item='${clothes.clothes}' WHERE monkey_id=${id}`);
  },

  deleteMonkey: function(id) {
    return knex.raw(`DELETE from monkeys WHERE id=${id}`);
  },

  deleteClothes: function(id) {
    return knex.raw(`DELETE from clothes WHERE monkey_id=${id}`);
  }

}

// insert into monkeys values (DEFAULT, 'randall', 15);
// insert into clothes (clothing_item, monkey_id) values ('beanie', (SELECT MAX(id) FROM monkeys));
