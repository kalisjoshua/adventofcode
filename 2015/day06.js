function main (input, libs) {
  input = input
    .split(/\n/)

  main.libs = libs

  partOne(input, (...args) => libs.report('Part one', ...args))
  partTwo(input, (...args) => libs.report('Part two', ...args))
}

function partOne (input, report) {
  const operations = {
    on: () => 1,
    off: () => 0,
    toggle: (arg) => !arg,
  }

  const grid = turnOnTheLights(input, operations)

  const result = grid
    .reduce((total, row) => total + +row.filter(Boolean).length, 0)

  report(result, 377891)
}

function partTwo (input, report) {
  const operations = {
    on: (brightness) => brightness + 1,
    off: (brightness) => Math.max(brightness - 1, 0),
    toggle: (brightness) => brightness + 2,
  }

  const grid = turnOnTheLights(input, operations)

  const sum = (a, b) => a + b

  const result = grid
    .map((row) => row.reduce(sum))
    .reduce(sum)

  report(result, 14110788)
}

function turnOnTheLights (input, operations, size = 1000) {
  const grid = Array(size).fill()
    .map(() => Array(size).fill(0))

  const followInstructions = ([op, x1, y1, x2, y2]) => {
    let row = +x1

    while (row <= x2) {
      let col = +y1

      while (col <= y2) {
        grid[row][col] = operations[op](grid[row][col])
        col += 1
      }

      row += 1
    }
  }

  const parseInstruction = (line) => {
    const [op, x1, y1, x2, y2] = line
      .match(/(off|on|toggle)\s+(\d+),(\d+)[^\d]+(\d+),(\d+)/)
      .slice(1)

    return [op, x1, y1, x2, y2]
  }

  input
    .map(parseInstruction)
    .forEach(followInstructions)

  return grid
}

module.exports = main
