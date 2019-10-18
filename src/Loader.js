const fs = require('fs')
const path = require('path')
const homeDir = require('home-dir')

const rootDir = path.dirname(require.main.filename)
const possibleFiles = [
  '.czrc',
  '.czrc.js'
]

function findConfigFileInDir (dir) {
  // recursive find parent folders
  for (const fname of possibleFiles) {
    let f = path.join(dir, fname)
    if (fs.lstatSync(f).isFile) {
      return f
    }
  }
  return null
}
function findConfigFile () {
  let f
  f = findConfigFileInDir(rootDir)
  if (f) {
    return f
  }
  f = findConfigFileInDir(homeDir())
  if (f) {
    return f
  }
  throw new Error(`.czrc file not found`)
}

function loadConfig (file) {
  return new Promise((resolve, reject) => {
    if (file.match(/\.js$/)) {
      const js = require(file)
      resolve(js)
    } else {
      fs.readFile(file, 'utf8', (err, content) => {
        if (err) reject(err)
        try {
          resolve(JSON.parse(content))
        } catch (e) {
          reject(e)
        }
      })
    }
  })
}

function extractConfig (wholeObj) {
  if (wholeObj && wholeObj.config && wholeObj.config['cz-template']) {
    return wholeObj.config['cz-template']
  }
  return {}
}

module.exports = () => {
  let f = findConfigFile()
  let rawObj = loadConfig(f)
  return extractConfig(rawObj)
}
