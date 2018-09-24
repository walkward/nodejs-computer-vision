/*!
 * File summary...
 */

exports.up = function(knex) {
  return knex.schema.createTable('classes', function(table) {
    table.increments();
    table.integer('position').notNullable();
    table.string('model').notNullable();
    table.string('value').notNullable();
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('classes');
};
