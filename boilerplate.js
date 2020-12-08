function main (input, libs) {
  // input = input

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
