function main (input, {report}) {
  input = input
    .trim()
    .split('')

  partOne(input, (...args) => report('Part one', ...args))
  partTwo(input, (...args) => report('Part two', ...args))
}

function partOne (input, report) {
  const result = input
    .reduce((acc, paren) => acc + (paren === '(' ? 1 : -1), 0)

  report(result, 280)
}

function partTwo (input, report) {
  const result = input
    .reduce(([acc, pos], paren) => {

      return acc < 0
        ? [acc, pos]
        : [
          acc + (paren === '(' ? 1 : -1),
          pos += 1,
        ]
    }, [0, 0])
    .pop()

  report(result, 1797)
}

module.exports = main
