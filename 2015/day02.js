function main (input, libs) {
  input = input
    .trim()
    .split(/\n/)
    .map((str) => str.split('x').map(Number))

  main.libs = libs

  partOne(input, (...args) => libs.report('Part one', ...args))
  partTwo(input, (...args) => libs.report('Part two', ...args))
}

function partOne (input, report) {
  const need = (a, b, c) => 2 * a + 2 * b + 2 * c + Math.min(a, b, c)
  const result = input
    .map(([l, w, h]) => need(l * w, w * h, h * l))
    .reduce((a, b) => a + b)

  report(result, 1598415)
}

function partTwo (input, report) {
  const result = input
    .map((dimensions) => dimensions.reduce((a, b) => a * b)
      + dimensions.sort((a, b) => a - b).slice(0, 2).reduce((a, b) => 2 * (a + b)))
    .reduce((a, b) => a + b)

  report(result, 3812909)
}

module.exports = main
