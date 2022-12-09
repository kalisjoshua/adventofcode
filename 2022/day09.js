const NOPE = Symbol('NOPE')
const cleanRawInput = (raw) => raw
  .trim()
  .split(/\n/)

function solve (input, size) {
  const LEAD = [[0, 0]]
  const TAIL = Array(size).fill([[0, 0]])

  input.forEach((line) => {
    let [dir, dis] = line.split(' ')

    while (dis--) {
      LEAD.unshift({
        'U': [LEAD[0][0], LEAD[0][1] + 1],
        'D': [LEAD[0][0], LEAD[0][1] - 1],
        'L': [LEAD[0][0] - 1, LEAD[0][1]],
        'R': [LEAD[0][0] + 1, LEAD[0][1]],
      }[dir])

      const diffX = Math.abs(LEAD[0][0] - TAIL[0][0][0])
      const diffY = Math.abs(LEAD[0][1] - TAIL[0][0][1])

      if (diffX > 1 || diffY > 1) {
        TAIL[0].unshift(LEAD.at(1))
      }
    }
  })

  return [LEAD, ...TAIL]
}

function partOne(input, report, answer) {
  const tail = solve(input, 1)
    .pop()
    .map((p) => p.join())

  const result = new Set(tail).size

  report('Part one', result, answer)
}

function partTwo(input, report, answer) {
  const result = input

  report('Part two', result, answer)
}

module.exports = (raw, { report }) => {
  const input = cleanRawInput(raw)
  const example = cleanRawInput(`R 4
U 4
L 3
D 1
R 4
D 1
L 5
R 2`)

  partOne(input, report, 6087)
  // partTwo(example, report, NOPE)
}
