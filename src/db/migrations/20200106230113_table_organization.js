const { tableNames } = require('../../constants');

exports.up = (knex) => knex.schema.createTable(tableNames.ORGANIZATION, (table) => {
  table.increments();
  table.string('name');
  table.boolean('isGovernment');
  table.text('description');
  table.text('officeAddress');
  table.datetime('createdAt').defaultTo(knex.fn.now());
  table.datetime('updatedAt').defaultTo(knex.fn.now());
});

exports.down = (knex) => knex.schema.dropTable(tableNames.ORGANIZATION);
