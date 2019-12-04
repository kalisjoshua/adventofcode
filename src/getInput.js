const fs = require("fs")
const path = require("path")

function getInput (day) {
  const input = path.join(process.cwd(), "src", day)

  return fs.readFileSync(input, "utf8")
}

module.exports = getInput
