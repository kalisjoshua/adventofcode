const NOT_FOUND = Symbol('NOT_FOUND')

function main (input, libs) {
  input = input
    .trim()
    .split(/\n/)
    .map(Number)

  main.libs = libs

  partOne(input, (...args) => libs.report('Part one', ...args))
  partTwo(input, (...args) => libs.report('Part two', ...args))
}

function partOne (input, report) {
  const PREAMBLE = 25

  const result = input
    .reduce((outlier, line, lineNumber) => {
      if (outlier !== NOT_FOUND || lineNumber < PREAMBLE) {
        return outlier
      }

      const searchList = input
        .slice(lineNumber - PREAMBLE, lineNumber)
      const isValid = searchList
        .filter((num, index) => searchList.slice(index + 1).includes(line - num))

      return isValid.length ? outlier : line
    }, NOT_FOUND)

  report(result, 1639024365)
}

function partTwo (input, report) {
  const findContigousSet = (list, sum) => list
    .reduce((found, line, index, all) => {
      if (found.length) {
        return found
      }

      return all.slice(index)
        .reduce((group, n, i, remaining) => {
          if (group.length) {
            return group
          }

          const slice = remaining.slice(0, i)
          const total = slice.reduce((a, b) => a + b, 0)

          return total === sum ? slice : group
        }, found)
    }, [])
  const encryptionWeakness = (set) => ([
    Math.min(...set),
    Math.max(...set),
  ].reduce((a, b) => a + b, 0))
  const result = encryptionWeakness(findContigousSet(input, 1639024365))

  report(result, 219202240)
}

module.exports = main
