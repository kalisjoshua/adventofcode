function main (input, {report}) {
  input = input
    .match(/\d+/g)

  partOne(input, (...args) => report('Part one', ...args))
}

function fuel (mass) {
  const f = Math.floor(mass / 3) - 2

  return f > 0 ? f + fuel(f) : 0
}

function partOne (input, report) {
  const result = input
    .map(fuel)
    .reduce((a, x) => a + x)

  report(result, 5119312)
}

module.exports = main
