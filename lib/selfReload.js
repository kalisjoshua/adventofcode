const fs = require('fs')
const path = require('path')

function reload (...args) {
  const fullpath = path.resolve(...args)

  fs.watch(fullpath, () => {
    delete require.cache[fullpath]

    // eslint-disable-next-line global-require, import/no-dynamic-require
    require(fullpath)
  })
}

module.exports = reload
