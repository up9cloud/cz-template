# cz-template

> The Commitizen adapter to formulate commit message.
This repository is inspired by cz-emoji

## Install

1. Install package
```sh
$ npm i -g commitizen
$ npm i -g cz-template
```

2. create .czrc in your project folder

## Usage

> Add repo `./czrc` or global `~/.czrc` setting file to work

1. You can add more `questions`, `scopes`, `types` to extend default settings.
2. Change `formula` with `util.format` template string to format commit message head, default is `%s%s%s: %s`
3. Change `formulaKeys` for ordering the values (specifiers for the template), default is `['emoji', 'title', 'scope', 'subject']`
  [reference](https://github.com/angular/angular/blob/master/CONTRIBUTING.md#type)
  Support keys:
    - title: This will fill commit type e.q. feat, fix, ...
    - emoji: Fill emoji icon
    - subject: Fill subject of commit message
    - description: Fill description about commit message
    - scope: Fill scope name
    - ...: any keys in questions result, except body
  e.q. `%s%s%s: %s` with `['emoji', 'title', 'scope', 'subject']` would be: `🎉fix(common): I fixed something, yeah!`

> NOTE: Have a issue with `scopes`

```json
{
  "path": "cz-template",
  "config": {
    "cz-template": {
      "questions": [
        {
          "type": "input",
          "name": "issues",
          "message": "Add issue references (e.g. 'fix #123', 're #123'.):\n"
        },
        {
          "type": "list",
          "name": "scope",
          "message": "What is the scope of this change (e.g. component or file name)?",
          "choices": [
            {
              "name": "None",
              "value": ""
            },
            {
              "name": "test-scope",
              "value": "test-scope"
            }
          ]
        }
      ],
      "types": [
        {
          "description": "Add new feature",
          "title": "Features",
          "name": "feat",
          "emoji": "🎉",
          "code": ":tada:"
        },
        {
          "description": "Add type test",
          "title": "Test add type",
          "name": "testAddType",
          "emoji": "🎉",
          "code": ":tada:"
        }
      ],
      "formula": "${title} ${emoji} ${scope}: ${subject}"
    }
  }
}
```

## TODO

- [x] Fixed scopes options
- [x] Add loader to find .czrc ([reference](https://github.com/commitizen/cz-cli/blob/master/src/configLoader/loader.js#L20))
- [x] Pull request cz-ci to support `js` format

## Reference:

[cz-emoji](https://github.com/up9cloud/cz-emoji)
[cz-cli](https://github.com/commitizen/cz-cli)
