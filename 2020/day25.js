const cleanInput = (input) => input
  .trim()
  .split(/\n/)

function main (input, libs) {
  input = cleanInput(input)

  main.libs = libs

  partOne(input, (...args) => libs.report('Part one', ...args))
  partTwo(input, (...args) => libs.report('Part two', ...args))
}

function partOne (input, report) {
  report()
}

function partTwo (input, report) {
  // const result = input

  report()
}

module.exports = main
