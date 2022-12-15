const NOPE = Symbol('NOPE')
const cleanRawInput = (raw) => raw
  .trim()
  .split(/\n/)
  .map(parse)
  .reduce((grid, line) => {
    delete grid.pos

    return line.reduce(createMap, grid)
  }, {map: {'500,0': 'O'}})

function createMap (grid, [x, y]) {
  if (!grid.pos) {
    grid.pos = [x, y]
  }

  // top left corner
  if (!grid.origin) {
    grid.origin = [x, y]
  } else {
    if (grid.origin[0] > x) {
      grid.origin[0] = x
    }

    if (grid.origin[1] > y) {
      grid.origin[1] = y
    }
  }

  // bottom right corner
  if (!grid.extent) {
    grid.extent = [x, y]
  } else {
    if (grid.extent[0] < x) {
      grid.extent[0] = x
    }

    if (grid.extent[1] < y) {
      grid.extent[1] = y
    }
  }

  // horizontal line
  if (grid.pos[0] !== x) {
    const distance = Math.abs(grid.pos[0] - x) + 1
    const start = Math.min(grid.pos[0], x)

    ;[...Array(distance).keys()]
      .forEach((index) => (grid.map[`${start + index},${y}`] = '#'))
  }

  // vertical line
  if (grid.pos[1] !== y) {
    const distance = Math.abs(grid.pos[1] - y) + 1
    const start = Math.min(grid.pos[1], y)

    ;[...Array(distance).keys()]
      .forEach((index) => (grid.map[`${x},${start + index}`] = '#'))
  }

  grid.pos = [x, y]

  return grid
}

function display ({extent, map, origin}) {
  for (let y = 0; y <= extent[1]; y++) {
    let row = ''

    for (let x = origin[0]; x <= extent[0]; x++) {
      row += map[[x, y]] || '.'
    }

    // console.log(y, row)
    console.log(y, row)
  }
}

function parse (line) {
  return line
    .split(/\s+->\s+/)
    .map((a) => a.split(',').map(Number))
}

function partOne(input, report, answer) {
  const {extent, map} = input

  let sandUnits = 0
  const theVoid = extent[1]
  let voidBreach = false

  while (!voidBreach) {
    let landed = false
    let sand = [500, 0]

    do {
      const [x, y] = sand
      const down = [x, y + 1]
      const downLeft = [x - 1, y + 1]
      const downRight = [x + 1, y + 1]

      if (!map[down]) {
        if (y > theVoid) {
          voidBreach = true
        } else {
          sand = down
        }
      } else if (!map[downLeft]) {
        sand = downLeft
      } else if (!map[downRight]) {
        sand = downRight
      } else {
        map[sand] = 'o'
        sandUnits++
        landed = true
      }
    } while (!voidBreach && !landed)
  }

  report('Part one', sandUnits, answer)
}

function partTwo(input, report, answer) {
  const result = input

  report('Part two', result, answer)
}

module.exports = (raw, { report }) => {
  const input = cleanRawInput(raw)
  const example = cleanRawInput(`498,4 -> 498,6 -> 496,6
503,4 -> 502,4 -> 502,9 -> 494,9`)

  partOne(input, report, 901)
  // partTwo(input, report, NOPE)
}
