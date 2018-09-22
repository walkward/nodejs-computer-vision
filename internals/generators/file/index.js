/*!
 * Generate boilerplate files
 */

const path = require('path');

module.exports = {
  description: 'Generate typescript scaffolding',
  prompts: [{
    type: 'list',
    name: 'type',
    message: 'Select the type of file',
    default: 'function',
    choices: () => [
      'controller',
      'model',
      'test',
    ],
  }, {
    type: 'input',
    name: 'name',
    message: 'Enter a file name',
    validate: filename => {
      if (/^([^\s.\x00-\x1F!"$'\(\)*,\/:;<>\?\[\\\]\{\|\}\x7F]+)$/.test(filename)) return true;
      return 'Invalid filename';
    },
  }, {
    type: 'input',
    name: 'summary',
    message: answers => {
      switch (answers.type) {
      case 'test':
        return 'Describe what will be tested';
      case 'model':
        return 'Describe this object and how it will be used';
      case 'controller':
        return 'Describe what will be controlled';
      default:
        return 'Enter a short summary of the file contents';
      }
    },
  }, {
    type: 'confirm',
    name: 'generateTest',
    message: 'Generate tests?',
    default: false,
    when: answers => {
      if (answers.type !== 'test') return true;
      return false;
    },
  }, {
    type: 'confirm',
    name: 'restMethods',
    message: 'Does this controller contain REST methods?',
    default: false,
    when: answers => {
      if (answers.type === 'controller') return true;
      return false;
    },
  }],
  actions: answers => {
    const actionTypes = {
      test: {
        type: 'add',
        templateFile: path.join(__dirname, './test.js.hbs'),
        path: path.join(__dirname, '../../../src/tests/{{ camelCase name }}.test.ts'),
      },
      model: {
        type: 'add',
        templateFile: path.join(__dirname, './class.js.hbs'),
        path: path.join(__dirname, '../../../src/models/{{ properCase name }}.ts'),
      },
      controller: {
        type: 'add',
        templateFile: path.join(__dirname, './function.js.hbs'),
        path: path.join(__dirname, '../../../src/controllers/{{ camelCase name }}.ts'),
      },
    };

    // Assigning test
    const actions = [actionTypes[answers.type]];

    // Check if user has requested tests to be generated
    if (answers.generateTest) actions.push(actionTypes.test);

    return actions;
  },
};
