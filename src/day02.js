const computor = require("../lib/reload.js")("../lib/computor.js")

const input = process.argv[2]
  .match(/-?\d+/g)

let noun = 12
let verb = 2
const target = 19690720

// eslint-disable-next-line no-console
const log = (...args) => console.log(...args)

function fixInput (input, n, v) {
  const changed = input.slice(0)

  changed[1] = n
  changed[2] = v

  return changed
}

while (computor(null, fixInput(input, ++noun, verb))[0] < target);
noun--
while (computor(null, fixInput(input, noun, ++verb))[0] < target);

const result = 100 * noun + verb

if (result == 5121) {
  log("Program completed succesfully.", result)
} else {
  log("FAIL!", result)
}
