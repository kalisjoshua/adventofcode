const NOPE = Symbol('NOPE')
const cleanRawInput = (raw) => raw
  .trim()
  .split(/\n/)

function partOne(input, report, answer) {
  const H = [[0, 0]]
  const T = [[0, 0]]

  input.forEach((line) => {
    let [dir, dis] = line.split(' ')

    dis = parseInt(dis, 10)

    while (dis--) {
      const ref = H[0]

      switch (dir) {
        case 'U':
          H.unshift([ref[0], ref[1] + 1])
          break
        case 'D':
          H.unshift([ref[0], ref[1] - 1])
          break
        case 'L':
          H.unshift([ref[0] - 1, ref[1]])
          break
        case 'R':
          H.unshift([ref[0] + 1, ref[1]])
          break
      }

      const diffX = Math.abs(H[0][0] - T[0][0])
      const diffY = Math.abs(H[0][1] - T[0][1])

      if (diffX > 1 || diffY > 1) {
        T.unshift(H.slice(1, 2)[0])
      }
    }
  })

  const result = Array
    .from(new Set(T.map((p) => p.join())))
    .length

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
  partTwo(example, report, NOPE)
}
