const { tableNames } = require('../../constants');

exports.up = (knex) => knex.schema.createTable(tableNames.USER_ROLE_ORGANIZATION, (table) => {
  table.increments();
  table.string('role');
  table.integer('userId')
    .unsigned()
    .notNullable()
    .references('id')
    .inTable(tableNames.USER)
    .onDelete('CASCADE')
    .index();
  table.integer('organizationId')
    .unsigned()
    .notNullable()
    .references('id')
    .inTable(tableNames.ORGANIZATION)
    .onDelete('CASCADE')
    .index();
  table.datetime('createdAt').defaultTo(knex.fn.now());
  table.datetime('updatedAt').defaultTo(knex.fn.now());
});

exports.down = (knex) => knex.schema.dropTable(tableNames.USER_ROLE_ORGANIZATION);
