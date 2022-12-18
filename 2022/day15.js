const NOPE = Symbol('NOPE')
const cleanRawInput = (raw) => raw
  .trim()
  .split(/\n/)
  .reduce(parser, [])

function rowInspect (lines, row) {
  const result = lines
    .reduce((acc, [sx, sy, bx, by]) => {
      const radius = Math.abs(sx - bx) + Math.abs(sy - by)
      const xRange = [
        sx - (radius - Math.abs(row - sy)),
        sx + (radius - Math.abs(row - sy)),
      ]
      const yRange = [
        sy - radius,
        sy + radius,
      ]

      // console.log([sx, bx], radius)
      if (row > yRange[0] && row < yRange[1]) {
        for (let i = xRange[0]; i < xRange[1]; i++) {
          acc[i] = '#'
        }
      } else {
        let min = Math.min(sx, bx)
        const max = Math.max(sx, bx)

        // for (let i = min; i < max; min++) {
        //   acc[i] = acc[i] || '.'
        // }
      }

      return acc
    }, {})

    // console.log(result)
    return result
}

function parser (acc, line) {
  const [sx, sy, bx, by] = line
    .match(/[xy]=([^\s,\b:]+)/g)
    .map((str) => parseInt(str.slice(2), 10))

  // console.log(Math.abs(sx - bx) + Math.abs(sy - by))

  // acc.bLookup[[sx, sy]] = `${bx},${by}`
  // acc.sLookup[[bx, by]] = (acc.sLookup[[bx, by]] || []).concat([[sx, sy]])

  // acc.map[[sx, sy]] = 'S'
  // acc.map[[bx, by]] = 'B'

  // if (sx < acc.origin[0]) acc.origin[0] = sx
  // if (sy < acc.origin[1]) acc.origin[1] = sy

  // if (bx > acc.extent[0]) acc.extent[0] = bx
  // if (by > acc.extent[1]) acc.extent[1] = by

  return acc.concat([[sx, sy, bx, by]])
}

function partOne(input, report, answer) {
  // const result = rowInspect(input, 20)
  const result = Object.keys(rowInspect(input, 2000000)).length
  // console.log(result, Object.keys(result).length)

  report('Part one', result, answer)
}

function partTwo(input, report, answer) {
  const result = input

  report('Part two', result, answer)
}

module.exports = (raw, { report }) => {
  const input = cleanRawInput(raw)
  const example = cleanRawInput(`
Sensor at x=2, y=18: closest beacon is at x=-2, y=15
Sensor at x=9, y=16: closest beacon is at x=10, y=16
Sensor at x=13, y=2: closest beacon is at x=15, y=3
Sensor at x=12, y=14: closest beacon is at x=10, y=16
Sensor at x=10, y=20: closest beacon is at x=10, y=16
Sensor at x=14, y=17: closest beacon is at x=10, y=16
Sensor at x=8, y=7: closest beacon is at x=2, y=10
Sensor at x=2, y=0: closest beacon is at x=2, y=10
Sensor at x=0, y=11: closest beacon is at x=2, y=10
Sensor at x=20, y=14: closest beacon is at x=25, y=17
Sensor at x=17, y=20: closest beacon is at x=21, y=22
Sensor at x=16, y=7: closest beacon is at x=15, y=3
Sensor at x=14, y=3: closest beacon is at x=15, y=3
Sensor at x=20, y=1: closest beacon is at x=15, y=3`)

  partOne(input, report, NOPE)
  // partTwo(input, report, NOPE)
}