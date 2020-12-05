function main (input, {report}) {
  input = input
    .split(/\n/)
    .map(parse)

  partOne(input, (...args) => report('Part one', ...args))
  partTwo(input, (...args) => report('Part two', ...args))
}

function parse (str) {
  const [min, max, letter, password] = str
    .match(/^(\d+)-(\d+)\s+(.):\s+(\w+)$/)
    .slice(1)

  return {min, max, letter, password}
}

function partOne (input, report) {
  const result = input
    .filter(({min, max, letter, password}) => {
      const count = (password
        .match(RegExp(letter, 'g')) || [])
        .length

      return count >= min && count <= max
    })
    .length

  report(result, 550)
}

function partTwo (input, report) {
  const result = input
    .filter(({min, max, letter, password}) => {
      const first = password[min - 1] === letter
      const second = password[max - 1] === letter

      return (first || second) && !(first && second)
    })
    .length

  report(result, 634)
}

module.exports = main
