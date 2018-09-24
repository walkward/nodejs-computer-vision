import * as knex from 'knex';
import { Config } from 'knex';

export class Connection {
  public knex(): knex {
    return knex(exportConfig());
  }
}

function exportConfig(): Config {
  return require('../config/knexfile');
}
