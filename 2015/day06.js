function main (input, libs) {
  input = input
    .split(/\n/)

  main.libs = libs

  partOne(input, (...args) => libs.report('Part one', ...args))
  partTwo(input, (...args) => libs.report('Part two', ...args))
}

function partOne (input, report) {
  const operations = {
    'on': () => 1,
    'off': () => 0,
    'toggle': (arg) => !arg,
  }

  const grid = turnOnTheLights(input, operations)

  const result = grid
    .reduce((total, row) => total + +row.filter(Boolean).length, 0)

  report(result, 377891)
}

function partTwo (input, report) {

  // report(result)
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
        col++
      }

      row++
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
