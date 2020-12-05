function main (input, libs) {
  input = input
    .split(/\n/)

  main.libs = libs

  partOne(input, (...args) => libs.report('Part one', ...args))
  partTwo(input, (...args) => libs.report('Part two', ...args))
}

function partOne (input, report) {
  // const result = input

  report('Let the fun begin')
}

function partTwo (input, report) {
  // const result = input

  report('Let the fun begin')
}

module.exports = main
