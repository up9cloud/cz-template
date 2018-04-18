'use strict'

module.exports = (config, types) => {
  var questions = [
    {
      type: 'list',
      name: 'type',
      message: 'Select the type of change that you\'re committing:',
      choices: types,
    }, {
      type: config.scopes ? 'list' : 'input',
      name: 'scope',
      message: 'What is the scope of this change (e.g. component or file name)?',
      // Add fuzzy by fuse.js
      choices: config.scopes && [{ name: '[none]', value: '' }].concat(config.scopes),
    }, {
      type: 'input',
      name: 'subject',
      message: 'Write a short, imperative tense description of the change:\n',
    }, {
      type: 'input',
      name: 'body',
      message: 'Provide a longer description of the change: (press enter to skip)\n',
    },
  ]

  if (config.questions && config.questions.length) {
    console.error('Add questions')
  }
  console.error(questions)
  return questions
}
