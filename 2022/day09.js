const NOPE = Symbol('NOPE')
const cleanRawInput = (raw) => raw
  .trim()
  .split(/\n/)
const X = 0
const Y = 1

function follow ([LEAD, ...TAIL]) {
  const diffX = Math.abs(LEAD[0][X] - TAIL[0][0][X])
  const diffY = Math.abs(LEAD[0][Y] - TAIL[0][0][Y])

  if (diffX > 1 || diffY > 1) {
    TAIL[0].unshift(LEAD.at(1))
  }

  if (TAIL.length > 1) {
    follow(TAIL)
  }
}

function solve (input, size) {
  const LEAD = [[0, 0]]
  const TAIL = Array(size).fill().map(() => [[0, 0]])

  input.forEach((line) => {
    let [dir, dis] = line.split(' ')

    while (dis--) {
      LEAD.unshift({
        'U': [LEAD[0][X], LEAD[0][Y] + 1],
        'D': [LEAD[0][X], LEAD[0][Y] - 1],
        'L': [LEAD[0][X] - 1, LEAD[0][Y]],
        'R': [LEAD[0][X] + 1, LEAD[0][Y]],
      }[dir])

      follow([LEAD, ...TAIL])
    }
  })

  const pos = [
    LEAD[0],
    ...TAIL.slice(0, -1).map(([h]) => h),
    ...TAIL.at(-1),
  ]

  console.log(pos, TAIL.at(-1))
  print(TAIL.at(-1))
  return new Set(TAIL.at(-1).map((p) => p.join())).size
}

function partOne(input, report, answer) {
  const result = solve(input, 1)

  report('Part one', result, answer)
}

function partTwo(input, report, answer) {
  const result = solve(input, 4)

  report('Part two', result, answer)
}

function print(path, char = '#') {
  const listX = path.map(([x]) => x)
  const listY = path.map(([_, y]) => y)
  const maxX = Math.max(...listX)
  const maxY = Math.max(...listY)
  const minX = Math.min(...listX)
  const minY = Math.min(...listY)

  const lookup = path
    .reduce((acc, coord) => {
      acc[coord] = true

      return acc
    }, {})
  const BORDER = 2
  let output = ''

  for (let y = maxY + BORDER; y >= minY - BORDER; y--) {
    for (let x = minX - BORDER; x <= maxX + BORDER; x++) {
      if (x === 0 && y === 0) {
        output += ' S'
      } else if ([x, y] in lookup) {
        output += ' ' + char
      } else {
        output += ' .'
      }
    }

    output += '\n'
  }

  console.log(output)
}

module.exports = (raw, { report }) => {
  const input = cleanRawInput(raw)
//   const example = cleanRawInput(`R 5
// U 8
// L 8
// D 3
// R 17
// D 10
// L 25
// U 20`)
  // const example = cleanRawInput(`U 22`)
  const example = cleanRawInput(`R 5
U 5
`)

  // partOne(input, report, 6087)
  partTwo(example, report, NOPE)
}
