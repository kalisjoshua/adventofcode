const NOPE = Symbol('NOPE')
const cleanRawInput = (raw) => raw
  .trim()
  .split(/\n/)

function partOne(input, report, answer) {
  const key = {
    'A X': 4,
    'A Y': 8,
    'A Z': 3,
    'B X': 1,
    'B Y': 5,
    'B Z': 9,
    'C X': 7,
    'C Y': 2,
    'C Z': 6,
  }

  const result = input
    .reduce((acc, play) => acc + key[play], 0)

  report('Part one', result, answer)
}

function partTwo(input, report, answer) {
  const key = {
    'A X': 3, // L 0 + 3
    'A Y': 4, // T 3 + 1
    'A Z': 8, // W 6 + 2
    'B X': 1, // L 0 + 1
    'B Y': 5, // T 3 + 2
    'B Z': 9, // W 6 + 3
    'C X': 2, // L 0 + 2
    'C Y': 6, // T 3 + 3
    'C Z': 7, // W 6 + 1
  }

  const result = input
    .reduce((acc, play) => acc + key[play], 0)

  report('Part two', result, answer)
}

module.exports = (raw, { report }) => {
  const input = cleanRawInput(raw)

  partOne(input, report, 13682)
  partTwo(input, report, 12881)
}
