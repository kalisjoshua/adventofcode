function main (input, libs) {
  const parseInputLines = ([current, ...rest], line) => (
    line.trim()
      ? [current.concat(line.trim()), ...rest]
      : [[], current, ...rest]
  )

  input = input
    .trim()
    .split(/\n/)
    .reduce(parseInputLines, [[]])

  main.libs = libs

  partOne(input, (...args) => libs.report('Part one', ...args))
  partTwo(input, (...args) => libs.report('Part two', ...args))
}

function partOne (input, report) {
  const result = input
    .map((group) => (new Set(group.flatMap((str) => str.split(''))).size))
    .reduce((a, b) => a + b)

  report(result, 6748)
}

function partTwo (input, report) {
  const result = input
    .map((group) => {
      const all = new Set(group.flatMap((str) => str.split('')))

      // eslint-disable-next-line no-restricted-syntax
      for (const q of all) {
        if (!group.every((person) => person.includes(q))) {
          all.delete(q)
        }
      }

      return all.size
    })
    .reduce((a, b) => a + b)

  report(result, 3445)
}

module.exports = main
