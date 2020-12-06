const parseInputLines = ([current, ...rest], line) => (
  line.trim()
    ? [current.concat(line.trim()), ...rest]
    : [[], current, ...rest]
)
const split = (str) => str.split('')
const sum = (a, b) => a + b

function main (input, libs) {
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
    .map((group) => (new Set(group.flatMap(split)).size))
    .reduce(sum)

  report(result, 6748)
}

function partTwo (input, report) {
  const result = input
    .map((group) => {
      const all = new Set(group.flatMap(split))

      // eslint-disable-next-line no-restricted-syntax
      for (const q of all) {
        if (!group.every((person) => person.includes(q))) {
          all.delete(q)
        }
      }

      return all.size
    })
    .reduce(sum)

  report(result, 3445)
}

module.exports = main
