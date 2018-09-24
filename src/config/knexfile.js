/**
 * Knex configuration used globally
 * -------------------
 *
 * @file
 * @see {@link http://knexjs.org/|Knex}
 */

require('dotenv').config();

module.exports = {
  client: 'pg',
  connection: {
    host: process.env.POSTGRES_HOST,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    port: process.env.POSTGRES_PORT,
  },
  pool: {
    min: 0,
    max: 10,
    idleTimeoutMillis: 10000,
  },
  migrations: {
    tableName: 'knex_migrations',
    directory: './db/migrations',
  },
  seeds: {
    directory: './db/seeds',
  },
};
