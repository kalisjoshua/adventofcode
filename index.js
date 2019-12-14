const {execFile} = require("child_process")
const {join} = require("path")
const {readFileSync} = require("fs")

// eslint-disable-next-line no-console
const clear = () => console.clear()
// eslint-disable-next-line no-console
const log = console.log.bind(console)
const rDay = /src\/day\d\d\.js/g

function execHandler (error, stdout, stderr) {
  if (error || stderr) {
    log("There could be a problem here...")
    log(error || stderr)
  } else {
    log(stdout.trim())
  }
}

function onChange (file) {
  const dep = readFileSync(file, "utf8")
    .split("\n")[0]
    .match(rDay)

  if (rDay.test(file)) {
    runner(file)
  } else if (dep.length) {
    runner(dep.pop())
  }
}

function runner (file) {
  const absPath = join(process.cwd(), file)
  const input = readFileSync(absPath.replace(".js", "").replace("src", "input"), "utf8")

  clear()
  log(Array(30).join("~"))
  log(file, Math.random().toString(36).slice(2,6))
  log(Array(30).join("~"))

  execFile("node", [absPath, input], execHandler)
}

require('chokidar')
  .watch(["./lib", "./src"])
  .on('change', onChange)

clear()
log("Waiting for change")
