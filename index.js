const fs = require('fs')
const path = require('path')

const bars = ['=', '-'].map((str) => Array(36).join(str))
const dayPattern = /^day\d\d\.js$/
const dependencies = {}
const lib = path.resolve('lib')
const src = path.resolve(`${process.argv[2] || 2019}`)

const getSourceFileList = () => fs.readdirSync(src)
  .filter((file) => dayPattern.test(file))
const readInput = (name) => fs
  .readFileSync(path.resolve(src, name + '.input'), 'utf8')
  .trim()

function reload (...args) {
  const rel = path.resolve(...args)

  delete require.cache[rel]

  return require(rel)
}

function runner (files, isDependency = false) {
  // eslint-disable-next-line no-console
  console.clear()

  if (isDependency) {
    reload(lib, files[0])
  }

  const filesToRun = isDependency || !dayPattern.test(files[0])
    ? getSourceFileList()
    : files

  filesToRun
    .forEach((file) => {
      const {name} = path.parse(file)

      dependencies.log(bars[0])
      dependencies.log(name, '-', dependencies.limpid())
      dependencies.log(bars[1])

      try {
        reload(src, file)(readInput(name), dependencies)
      } catch (e) {
        dependencies.log("Whooops, something didn't go right.")
        dependencies.log(e)
      }

      dependencies.log()
    })
}

fs.readdirSync(lib)
  .forEach((file) => {
    dependencies[path.parse(file).name] = reload(lib, file)
  })

fs.watch(lib, (event, file) => runner([file], true))
fs.watch(src, (event, file) => runner([file]))

runner(getSourceFileList())
