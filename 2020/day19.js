const cleanInput = (input) => input
  .trim()
  .replace(/"/g, '')
  .split(/\n/)

function main (input, libs) {
  input = cleanInput(input)

  main.libs = libs

  partOne(input, (...args) => libs.report('Part one', ...args))
  partTwo(input, (...args) => libs.report('Part two', ...args))
}

function partOne (input, report) {
  const result = simpleSolution(input)

  report(result, 224)
}

function partTwo (input, report) {
  // const result = input

  report()
}

function simpleSolution (input) {
  const [rules, messages] = input
    .reduce((acc, line, lineNum, all) => {
      if (/^\d/.test(line)) {
        const [index, rule] = line.split(': ')

        acc[0][index] = /\|/.test(rule) ? `(?:${rule})` : rule
      } else if (line) {
        acc[1].push(line)
      }

      if (lineNum + 1 === all.length) {
        let expanded = acc[0][0]

        do {
          expanded = expanded
            .replace(/\d+/, (m) => acc[0][m])
        } while (/\d/.test(expanded))

        const pattern = expanded
          .replace(/\s+/g, '')

        acc[0] = RegExp(`^${pattern}$`)
      }

      return acc
    }, [{}, []])

  return messages
    .filter((line) => rules.test(line))
    .length
}

module.exports = main
