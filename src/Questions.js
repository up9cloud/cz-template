'use strict'
const fuse = require('fuse.js')
module.exports = (config, types) => {
  // Default questions
  const fuzzy = new fuse(types, {
    shouldSort: true,
    threshold: 0.4,
    location: 0,
    distance: 100,
    maxPatternLength: 32,
    minMatchCharLength: 1,
    keys: ["name", "code"]
  })
  var questions = [
    {
      type: 'autocomplete',
      name: 'type',
      message: "Select the type of change you're committing:",
      source: (answersSoFar, query) => {
        return Promise.resolve(query ? fuzzy.search(query) : types)
      }
    },
    {
      type: config.scopes ? 'list' : 'input',
      name: 'scope',
      message: 'What is the scope of this change (e.g. component or file name)?',
      // Add fuzzy by fuse.js
      choices: config.scopes && [{ name: '[none]', value: '' }].concat(config.scopes),
    },
    {
      type: 'input',
      name: 'subject',
      message: 'Write a short, imperative tense description of the change:\n',
    },
    {
      type: 'input',
      name: 'body',
      message: 'Provide a longer description of the change: (press enter to skip)\n',
    },
    {
      type: 'input',
      name: 'issues',
      message: 'List any issue closed (#1, ...):'
    }
  ]

  if (config.questions && Array.isArray(config.questions)) questions = questions.concat(config.questions)
  return questions
}
