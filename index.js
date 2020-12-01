const cp = require("child_process")
const fs = require("fs")
const path = require("path")

const limpid = require("./lib/limpid")

const pwd = process.cwd()

// eslint-disable-next-line no-console
const log = (...args) => console.log(...args)

const input = (day) => fs.readFileSync(path.join(pwd, "input", day), "utf-8")
const src = (day) => path.join(pwd, "src", day + ".js")

function runner (files, filter) {
  // eslint-disable-next-line no-console
  console.clear()

  const filesToRun = filter
    ? files.filter((file) => (new RegExp(filter)).test(fs.readFileSync(path.join(pwd, "src", file), "utf8")))
    : files

  if (!filesToRun.length) {
    log(Array(30).join("!"))
    log("No dependent files.", filter)
    log(Array(30).join("!"))

    return
  }

  filesToRun
    .map((file) => {
      const day = file.match(/day\d\d/)[0]

      log(Array(30).join("="))
      files.length > 1 ? log(day) : log(day, "-", limpid())
      log(Array(30).join("-"))

      try {
        log(cp.execFileSync("node", [src(day), input(day).trim()]).toString())
      } catch (error) {
        log("There could be a problem here...")
      }
    })
}

fs.watch("./lib", (_, file) => runner(fs.readdirSync("./src"), `lib/${file.replace(".js", "")}`))
fs.watch("./src", (_, file) => runner([file]))

runner(fs.readdirSync("./src"))
