const example = `
[({(<(())[]>[[{[]{<()<>>
[(()[<>])]({[<{<<[]>>(
{([(<{}[<>[]}>{[]{[(<()>
(((({<>}<{<{<>}{[]{[]{}
[[<[([]))<([[{}[[()]]]
[{[{({}]{}}([{[{{{}}([]
{<[[]]>}<{[{[{[]{()[[[]
[<(<(<(<{}))><([]([]()
<{([([[(<>()){}]>(<<{{
<{([{{}}[<[[[<>{}]]]>[]]
`

const brackets = {
  "(": ")",
  "[": "]",
  "{": "}",
  "<": ">",
}
const close = Object.values(brackets)
const open = Object.keys(brackets)
const corruptionPoints = {
  ")": 3,
  "]": 57,
  "}": 1197,
  ">": 25137,
}
const completionPoints = {
  ")": 1,
  "]": 2,
  "}": 3,
  ">": 4,
}

function parse (line) {
  return line
    .split("")
    .reduce((acc, char) => {
      if (acc.corrupted) return acc

      if (open.includes(char)) {
        acc.expected.unshift(close[open.indexOf(char)])
      } else if (acc.expected[0] === char) {
        acc.expected.shift()
      } else {
        acc.corrupted = true
        acc.found = char
      }

      return acc
    }, {corrupted: false, expected: [], found: "", line})
}

module.exports = (input, {report}) => {
  input = input
    .trim()
    .split(/\n/)
    .map(parse)

  const partOne = input
    .filter((line) => line.corrupted)
    .map(({found}) => corruptionPoints[found])
    .reduce((a, b) => a + b)

  const oddBunch = input
    .filter(({corrupted}) => !corrupted)
    .map(({expected}) => expected.reduce((acc, char) => acc * 5 + completionPoints[char], 0))
    .sort((a, b) => a - b)

  const partTwo = oddBunch[Math.floor(oddBunch.length / 2)]

  report('Part one', partOne, 323613)
  report('Part two', partTwo, 3103006161)
}
