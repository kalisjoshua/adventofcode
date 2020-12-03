function main (input, {report}) {
  input = input
    .split("-")

  // partOne(input, (...args) => report('Part one', ...args))
  partTwo(input, (...args) => report('Part two', ...args))
}

function partTwo (input, report) {
  let [min] = input
  const options = []

  const alwaysIncreasing = (num) =>
    num == num.toString().split("").sort().join("")
  const properSequence = (num) =>
    (num.toString().match(/(\d)\1+/g) || []).some((s) => s.length === 2)

  do {
    if (properSequence(min) && alwaysIncreasing(min)) options.push(min)
  } while (++min < input[1])

  report(options.length, 1411)
}

module.exports = main
