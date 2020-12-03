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

function reload (file) {
  const rel = path.resolve(lib, file)

  delete require.cache[rel]
  dependencies[path.parse(file).name] = require(rel)
}

function runner (files, isDependency = false) {
  // eslint-disable-next-line no-console
  console.clear()

  if (isDependency) {
    reload(files[0])
  }

  const filesToRun = isDependency || !dayPattern.test(files[0])
    ? getSourceFileList()
    : files

  filesToRun
    .forEach((file) => {
      const {name} = path.parse(file)
      const rel = path.resolve(src, file)

      dependencies.log(bars[0])
      dependencies.log(name, '-', dependencies.limpid())
      dependencies.log(bars[1])

      delete require.cache[rel]
      require(rel)(readInput(name), dependencies)

      dependencies.log()
    })
}

fs.readdirSync(lib).forEach(reload)

fs.watch(lib, (event, file) => runner([file], true))
fs.watch(src, (event, file) => runner([file]))

runner(getSourceFileList())
