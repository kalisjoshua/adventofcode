function main (input, libs) {
  input = input
    .split(/\n/)

  main.libs = libs

  partOne(input, (...args) => libs.report('Part one', ...args))
  partTwo(input, (...args) => libs.report('Part two', ...args))
}

function partOne (input, report) {

  // report(result)
}

function partTwo (input, report) {

  // report(result)
}

module.exports = main
