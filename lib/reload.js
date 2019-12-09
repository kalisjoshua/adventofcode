const {join} = require("path")
const {cwd} = process

function reload (path) {
  delete require.cache[join(cwd(), path.replace(/^\.\.\//, ""))]

  return require(path)
}

module.exports = reload
