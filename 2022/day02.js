const cleanRawInput = (raw) => raw
  .trim()
  .split(/\n/)

/*
  A|X / 1 Rock
  B|Y / 2 Paper
  C|Z / 3 Scissor
*/

const playPoints = ['X', 'Y', 'Z']
const tieConditions = ['A X', 'B Y', 'C Z']
const winConditions = ['A Y', 'B Z', 'C X']

const key = [
  'A X',
  'A Y',
  'A Z',
  'B X',
  'B Y',
  'B Z',
  'C X',
  'C Y',
  'C Z',
].reduce((acc, play) => {
  acc[play] = 1
    + playPoints.indexOf(play.slice(-1))
    + (tieConditions.includes(play) ? 3 : 0)
    + (winConditions.includes(play) ? 6 : 0)

  return acc
}, {})

function partOne(input, report, answer) {
  const result = input
    .reduce((acc, play) => acc + key[play], 0)

  report('Part one', result, answer)
}

function partTwo(input, report, answer) {
  const result = input

  report('Part one', result, answer)
}

module.exports = (raw, { report }) => {
  const input = cleanRawInput(raw)
  // const input = [
  //   'A Y',
  //   'B X',
  //   'C Z',
  // ]

  partOne(input, report, 13682)
  // partTwo(input, report, null)
}
