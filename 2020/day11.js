const cleanInput = (input) => input
  .trim()
  .split(/\n/)

function applySeatingRules (grid, adjacent, limit) {
  return grid
    .map((row, rowNum) => row
      .split('')
      .map((seat, colNum) => {
        const adj = adjacent(grid, rowNum, colNum)
        const occ = adj.filter((status) => status === '#')

        if (seat === 'L' && !occ.length) {
          return '#'
        }

        if (seat === '#' && occ.length >= limit) {
          return 'L'
        }

        return seat
      })
      .join(''))
}

function iterations (current, adjacent, limit) {
  const next = applySeatingRules(current, adjacent, limit)

  return current.toString() === next.toString()
    ? current
    : iterations(next, adjacent, limit)
}

function main (input, libs) {
  input = cleanInput(input)

  main.libs = libs

  partOne(input, (...args) => libs.report('Part one', ...args))
  partTwo(input, (...args) => libs.report('Part two', ...args))
}

function partOne (input, report) {
  const adjacent = (grid, rowNum, colNum) => [
    grid[rowNum - 1] && grid[rowNum - 1][colNum - 1],
    grid[rowNum - 1] && grid[rowNum - 1][colNum + 0],
    grid[rowNum - 1] && grid[rowNum - 1][colNum + 1],
    grid[rowNum + 0][colNum - 1],
    grid[rowNum + 0][colNum + 1],
    grid[rowNum + 1] && grid[rowNum + 1][colNum - 1],
    grid[rowNum + 1] && grid[rowNum + 1][colNum + 0],
    grid[rowNum + 1] && grid[rowNum + 1][colNum + 1],
  ]

  const result = iterations(input, adjacent, 4)
    .join('\n')
    .match(/#/g)
    .length

  report(result, 2468)
}

function partTwo (input, report) {
  const adjacent = (grid, rowNum, colNum) => [
    sightLine(grid, rowNum, colNum, -1, -1),
    sightLine(grid, rowNum, colNum, -1, +0),
    sightLine(grid, rowNum, colNum, -1, +1),
    sightLine(grid, rowNum, colNum, +0, -1),
    sightLine(grid, rowNum, colNum, +0, +1),
    sightLine(grid, rowNum, colNum, +1, -1),
    sightLine(grid, rowNum, colNum, +1, +0),
    sightLine(grid, rowNum, colNum, +1, +1),
  ]

  function sightLine (grid, row, col, rowAdj, colAdj) {
    [row, col] = [row + rowAdj, col + colAdj]

    const outsideGrid = false
      || row < 0 || row >= grid.length
      || col < 0 || col >= grid[0].length

    if (outsideGrid) {
      return undefined
    }

    if (grid[row][col] !== '.') {
      return grid[row][col]
    }

    return sightLine(grid, row, col, rowAdj, colAdj)
  }

  const result = iterations(input, adjacent, 5)
    .join('\n')
    .match(/#/g)
    .length

  report(result, 2214)
}

module.exports = main
