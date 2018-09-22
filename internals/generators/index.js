/**
 * generator/index.js
 *
 * Exports the generators so plop knows them
 */

const fileGenerator = require('./file');

module.exports = plop => {
  plop.setGenerator('file', fileGenerator);
};
