const NOPE = Symbol('NOPE')
const cleanRawInput = (raw) => raw
  .trim()
  .split(/\n/)
  .map((line) => line.match(/\d+/g).map((n) => +n))

function partOne(input, report, answer) {
  const result = input
    .filter(([a, b, c, d]) => ((a >= c && b <= d) || (c >= a && d <= b)))
    .length

  report('Part one', result, answer)
}

function partTwo(input, report, answer) {
  const result = input
    .filter(([a, b, c, d]) => (
      (a >= c && a <= d) ||
      (b >= c && b <= d) ||
      (c >= a && c <= b) ||
      (d >= a && d <= b)
    ))
    .length

  report('Part two', result, answer)
}

module.exports = (raw, { report }) => {
  const input = cleanRawInput(raw)

  partOne(input, report, 560)
  partTwo(input, report, 839)
}
