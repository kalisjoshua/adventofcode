const fs = require('fs')
const path = require('path')

const allYears = fs.readdirSync('.')
  .filter((file) => file.match(/^\d{4}$/))
const bars = ['=', '-']
  .map((str) => Array(36).join(str))
const dayPattern = /^(day\d\d)\./
const dayFilter = (file) => dayPattern.test(file) && file.endsWith('.js')
const dependencies = {}
const requiredArg = () => {throw new Error('')}
const readInput = (dir, name = requiredArg()) => fs
  .readFileSync(path.resolve(dir, `${name}.input`), 'utf8')
  .trim()
const yearPattern = /\d{4}$/

let workingYear = process.argv[2] || allYears.slice(-1)[0]

function reload (rel, isLib = false) {
  delete require.cache[rel]

  // eslint-disable-next-line global-require, import/no-dynamic-require
  const req = require(rel)

  if (isLib) {
    dependencies[path.parse(rel).name] = req
  }

  return req
}

function runner (dir, file) {
  // eslint-disable-next-line no-console
  console.clear()

  if (yearPattern.test(dir)) {
    // reset the current year to the most recently run day;
    // this will allow all days to be re-run for dependencies without requiring
    // stopping the program and restarting with a new current year
    [workingYear] = dir.match(yearPattern)
  } else {
    reload(path.resolve(dir, file), true)

    dir = path.resolve(workingYear)
    file = undefined
  }

  const filesToRun = !file
    // no file specified, run them all
    ? fs.readdirSync(dir).filter(dayFilter)
    : [`${file.match(dayPattern).slice(1)}.js`]

  filesToRun
    .map((filename) => path.join(dir, filename))
    .forEach((day) => {
      const {name} = path.parse(day)

      dependencies.log(bars[0])
      dependencies.log(workingYear, '/', name, '-', dependencies.limpid())
      dependencies.log(bars[1])

      try {
        reload(path.resolve(dir, day))(readInput(dir, name), dependencies)
      } catch (e) {
        dependencies.log.warn("Whooops, something didn't go right.")
        dependencies.log.error(e)
      }

      dependencies.log()
    })
}

const lib = path.resolve('lib')

fs.readdirSync(lib)
  .forEach((file) => reload(path.resolve(lib, file), true))

fs.watch(lib, (event, file) => runner(path.resolve(lib), file))

allYears
  .forEach((year) => {
    const dir = path.resolve(year)

    fs.watch(dir, (event, file) => runner(path.resolve(dir), file))
  })

runner(path.resolve(workingYear))
