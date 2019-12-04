const {execFile} = require("child_process")
const {join} = require("path")
const {readFileSync} = require("fs")

// eslint-disable-next-line no-console
const clear = () => console.clear()
// eslint-disable-next-line no-console
const log = console.log.bind(console)
const rDay = /(day\d\d)\.js/

function execHandler (error, stdout, stderr) {
  if (error || stderr) {
    log("There could be a problem here...")
    log(error || stderr)
  } else {
    log(stdout.trim())
  }
}

function onChange (file) {
  if (rDay.test(file)) {
    clear()

    const absPath = join(process.cwd(), file)
    const input = readFileSync(absPath.replace(".js", ""), "utf8")

    log(absPath.match(rDay)[1])

    execFile("node", [absPath, input], execHandler)
  }
}

require('chokidar')
  .watch('./src')
  .on('change', onChange)

clear()
log("Waiting for change")
