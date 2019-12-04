const fs = require("fs")
const path = require("path")

function getInput (day, file = "input") {
  const input = path.join(process.cwd(), "src", day, file)

  return fs.readFileSync(input, "utf8")
}

module.exports = getInput
