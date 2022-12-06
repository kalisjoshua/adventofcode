const NOPE = Symbol('NOPE')
const cleanRawInput = (raw) => raw
  .trim()
  .split(/\n/)

function partOne(input, report, answer) {
  const result = input

  report('Part one', result, answer)
}

function partTwo(input, report, answer) {
  const result = input

  report('Part one', result, answer)
}

module.exports = (raw, { report }) => {
  const input = cleanRawInput(raw)

  partOne(input, report, NOPE)
  // partTwo(input, report, NOPE)
}
