const {execFile} = require("child_process")
const {join} = require("path")

// eslint-disable-next-line no-console
const clear = () => console.clear()
// eslint-disable-next-line no-console
const log = console.log.bind(console)

require('chokidar')
  .watch('./src')
  .on('change', (file) => {
    if (/day\d\d\.js$/.test(file)) {
      clear()

      const fullPath = join(process.cwd(), file)

      execFile("node", [fullPath], (error, stdout, stderr) => {
        if (error || stderr) {
          log("Encountered a problem.")
          log(error || stderr)
        } else {
          log([fullPath.match(/(day\d\d?)/)[1], stdout.trim()].join(" = "))
        }
      })
    }
  })

clear()
log("Waiting for the first change")
