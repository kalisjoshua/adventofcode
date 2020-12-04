const fs = require('fs')
const path = require('path')

const allYears = fs.readdirSync('.')
  .filter((file) => file.match(/^\d{4}$/))
const bars = ['=', '-']
  .map((str) => Array(36).join(str))
const currentYear = process.argv[2] || allYears.slice(-1)[0]
const dayPattern = /^day\d\d\.js$/
const dependencies = {}
const lib = path.resolve('lib')
const src = path.resolve(currentYear)

const getSourceFileList = (dir = src) => fs.readdirSync(dir)
  .filter((file) => dayPattern.test(file))
const requiredArg = () => {throw new Error('')}
const readInput = (dir = src, name = requiredArg()) => fs
  .readFileSync(path.resolve(dir, name + '.input'), 'utf8')
  .trim()

function reload (...args) {
  const rel = path.resolve(...args)

  delete require.cache[rel]

  if (args[0] === lib) {
    dependencies[path.parse(rel).name] = require(rel)
  }

  return require(rel)
}

function runner (dir, files, isDependency = false) {
  // eslint-disable-next-line no-console
  console.clear()

  const [year] = dir.match(/\d{4}$/)

  if (isDependency) {
    reload(lib, files[0])
  }

  const filesToRun = isDependency || !dayPattern.test(files[0])
    ? getSourceFileList(dir)
    : files

  filesToRun
    .forEach((file) => {
      const {name} = path.parse(file)

      dependencies.log(bars[0])
      dependencies.log(year, '/', name, '-', dependencies.limpid())
      dependencies.log(bars[1])

      try {
        reload(dir, file)(readInput(dir, name), dependencies)
      } catch (e) {
        dependencies.log.warn("Whooops, something didn't go right.")
        dependencies.log.error(e)
      }

      dependencies.log()
    })
}

fs.readdirSync(lib)
  .forEach((file) => reload(lib, file))

fs.watch(lib, (event, file) => runner(lib, [file], true))

allYears
  .forEach((year) => {
    const dir = path.resolve(year)

    fs.watch(dir, (event, file) => runner(dir, [file]))
  })

runner(src, getSourceFileList())
