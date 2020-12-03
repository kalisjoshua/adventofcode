delete require.cache["./computor.js"]
const computor = require("./computor.js")

function main (input, {report}) {
  input = input
    .match(/-?\d+/g)

  // partOne(input, (...args) => report('Part one', ...args))
  partTwo(input, (...args) => report('Part two', ...args))
}

function partTwo (input, report) {
  let noun = 12
  let verb = 2
  const target = 19690720

  function fixInput (input, n, v) {
    const changed = input.slice(0)

    changed[1] = n
    changed[2] = v

    return changed
  }

  while (computor(fixInput(input, ++noun, verb)).program[0] < target);
  noun--
  while (computor(fixInput(input, noun, ++verb)).program[0] < target);

  const result = 100 * noun + verb

  report(result, 5121)
}

module.exports = main
