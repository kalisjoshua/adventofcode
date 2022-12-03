const NOPE = Symbol('NOPE')
const cleanRawInput = (raw) => raw
  .trim()
  .split(/\n/)

const findCommon = (first, second) => first
  .split('')
  .reduce((acc, char) => (!acc.includes(char) && second.includes(char))
    ? acc.concat(char)
    : acc, [])
const genCharArray = (offset = 65, len = 26) => Array(len)
  .fill(0)
  .map((_, i) => String.fromCharCode(i + offset))
const priority = [...genCharArray(97), ...genCharArray(65)]

function partOne(input, report, answer) {
  const compartments = (rucksack, len = rucksack.length / 2) => [
    rucksack.slice(0, len),
    rucksack.slice(len),
  ]
  const result = input
    .reduce((acc, s) => acc + priority.indexOf(findCommon(...compartments(s))[0]) + 1, 0)

  report('Part one', result, answer)
}

function partTwo(input, report, answer) {
  const groups = input
    .reduce((acc, s) => {
      if (acc.slice(-1)[0].length === 3) {
        acc.push([])
      }

      acc.slice(-1)[0].push(s)

      return acc
    }, [[]])
  const result = groups
    .reduce((acc, [a, b, c]) => (acc + priority.indexOf(findCommon(findCommon(a, b).join(''), c)[0]) + 1), 0)

  report('Part two', result, answer)
}

module.exports = (raw, { report }) => {
  const input = cleanRawInput(raw)

  partOne(input, report, 7763)
  partTwo(input, report, 2569)
}
