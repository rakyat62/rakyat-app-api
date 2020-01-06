const { tableNames } = require('../../constants');

exports.up = (knex) => knex.schema.createTable(tableNames.USER, (table) => {
  table.increments();
  table.string('username').unique();
  table.string('email').unique();
  table.string('password');
  table.string('firstName');
  table.string('lastName');
  table.string('phone');
  table.datetime('createdAt').defaultTo(knex.fn.now());
  table.datetime('updatedAt').defaultTo(knex.fn.now());
});

exports.down = (knex) => knex.schema.dropTable(tableNames.USER);
