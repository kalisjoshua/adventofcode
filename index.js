const fs = require('fs')
const path = require('path')
const {performance} = require('perf_hooks')

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

  let nonDayFilter = () => true

  if (yearPattern.test(dir)) {
    // reset the current year to the most recently run day's year;
    // this will allow all days to be re-run for dependencies without requiring
    // stopping the program and restarting with a new current year
    [workingYear] = dir.match(yearPattern)

    // for non-day file in year directory
    if (file && !dayPattern.test(file)) {
      const nonDayFile = path.resolve(dir, file)

      reload(nonDayFile)

      // filters for files that have the edited/saved file as a dependency
      nonDayFilter = (filepath) => (
        !require.cache[filepath] || require.cache[filepath].children
          .find(({id}) => id === nonDayFile)
      )
    }
  } else {
    // reload library file and update the dependencies object
    reload(path.resolve(dir, file), true)

    // reset to the current workingYear so that files can be run
    dir = path.resolve(workingYear)
    // no specific day was changed/saved so run them all
    file = undefined
  }

  const filesToRun = !file || !dayPattern.test(file)
    // no file specified, run them all
    ? fs.readdirSync(dir).filter(dayFilter)
    // run a specific file only
    : [`${file.match(dayPattern).slice(1)}.js`]

  filesToRun
    .map((filename) => path.join(dir, filename))
    .filter(nonDayFilter)
    .forEach((day) => {
      const {name} = path.parse(day)

      dependencies.log(bars[0])
      dependencies.log(workingYear, '/', name, '-', dependencies.limpid())
      dependencies.log(bars[1])

      try {
        const dayModule = reload(path.resolve(dir, day))
        const start = performance.now()

        dayModule(readInput(dir, name), dependencies)
        const end = performance.now()

        dependencies.log(bars[1])
        dependencies.log(workingYear, '/', name, 'took:', dependencies.runtimeFormat(end - start))
      } catch (e) {
        dependencies.log.warn("Whooops, something didn't go right.")
        dependencies.log.error(e)
      }

      dependencies.log('') // add an empty line to the output
    })
}

const lib = path.resolve('lib')

// load all library files as dependencies and make them available for solutions
fs.readdirSync(lib)
  .forEach((file) => reload(path.resolve(lib, file), true))

// watch for file changes in the library files and update them when saved
fs.watch(lib, (event, file) => runner(path.resolve(lib), file))

// watch all days for all years and re-run days that are being edited
allYears
  .forEach((year) => {
    const dir = path.resolve(year)

    fs.watch(dir, (event, file) => runner(path.resolve(dir), file))
  })

// initially run the selected years days
runner(path.resolve(workingYear))
