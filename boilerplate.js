const cleanInput = (input) => input
  .trim()
  .split(/\n/)
  // .map(Number)
  // .sort((a, b) => a - b)

function main (input, libs) {
  input = cleanInput(input)

  main.libs = libs

  partOne(input, (...args) => libs.report('Part one', ...args))
  partTwo(input, (...args) => libs.report('Part two', ...args))
}

function partOne (input, report) {
  // const result = input

  report()
}

function partTwo (input, report) {
  // const result = input

  report()
}

module.exports = main
