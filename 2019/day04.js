function main (input, {report}) {
  input = input
    .split('-')

  partTwo(input, (...args) => report('Part two', ...args))
}

function partTwo (input, report) {
  let [min] = input
  const options = []

  const alwaysIncreasing = (num) => num === parseInt(num.toString().split('').sort().join(''), 10)
  const properSequence = (num) => (num.toString().match(/(\d)\1+/g) || [])
    .some((s) => s.length === 2)

  do {
    if (properSequence(min) && alwaysIncreasing(min)) {
      options.push(min)
    }
  // eslint-disable-next-line no-plusplus
  } while (++min < input[1])

  report(options.length, 1411)
}

module.exports = main
