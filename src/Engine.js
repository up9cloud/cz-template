'use strict'
const util = require('util')
const truncate = require('cli-truncate')
const wrap = require('word-wrap')
const Loader = require('./Loader.js')
const Types = require('./Types.js')
const Questions = require('./Questions.js')

var filter = function (array) {
  return array.filter(function (x) {
    return x
  })
}

// TODO: Used quesions map to formula
function format (answers, template = null, keys = null) {
  template = template || '%s%s%s: %s'
  keys = keys || ['emoji', 'name', 'scope', 'subject']

  let values = []
  for (let key of keys) {
    switch (key) {
      case 'scope':
        let v = answers[key]
        v = v ? `(${v})` : ''
        values.push(v)
        break
      // The keywords not allow using in head
      case 'body':
        break
      default:
        if (answers[key]) {
          values.push(answers[key])
        } else if (answers.type[key]) {
          values.push(answers.type[key])
        } else {
          values.push('')
        }
    }
  }
  const message = util.format(template, ...values)
  const head = truncate(message.trim(), 100)

  // Wrap these lines at 100 characters
  var wrapOptions = {
    trim: true,
    newline: '\n',
    indent: '',
    width: 100,
  }
  const body = wrap(answers.body, wrapOptions)

  // TODO: break chain
  // Apply breaking change prefix, removing it if already present
  // var breaking = answers.breaking ? answers.breaking.trim() : ''
  // breaking = breaking ? 'BREAKING CHANGE: ' + breaking.replace(/^BREAKING CHANGE: /, '') : ''
  // breaking = wrap(breaking, wrapOptions)

  var issues = answers.issues ? wrap(answers.issues, wrapOptions) : ''
  var footer = filter([issues]).join('\n\n')
  return head + '\n\n' + body + '\n\n' + footer
}

module.exports = () => {
  return {
    prompter: function (cz, commit) {
      cz.prompt.registerPrompt('autocomplete', require('inquirer-autocomplete-prompt'))
      let config = {}
      Loader()
        .then(res => {
          var types = Types(res.types)
          config = res
          return Questions(config, types)
        })
        .then(cz.prompt)
        .then(res => format(res, config.formula, config.formulaKeys))
        .then(commit)
    },
  }
}
