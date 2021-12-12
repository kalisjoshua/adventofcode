const example = `
2199943210
3987894921
9856789892
8767896789
9899965678
`

const ref = (grid, x, y) => (grid[x] ?? [])[y] ?? 9
const sum = (a, b) => a + b

module.exports = (input, {report}) => {
  input = input
    .trim()
    .split(/\n/)
    .map((line) => line.split("").map(Number))

  const lows = input
    .reduce((allLows, line, rowIndex, grid) => line
      .reduce((lineLows, height, colIndex) => {
        const adj = [
          ref(grid, rowIndex, colIndex - 1),
          ref(grid, rowIndex, colIndex + 1),
          ref(grid, rowIndex - 1, colIndex),
          ref(grid, rowIndex + 1, colIndex),
        ]

        if (!adj.includes(height) && Math.min(...adj) > height) {
          lineLows.push(height)
        }

        return lineLows
      }, allLows), [])

  const partOne = lows
    .reduce(sum, 0) + lows.length

  const partTwo = input

  // input
  //   .forEach((row) => console.log(row.map((num) => num === 9 ? " " : num).join("")))

  report('Part one', partOne, 532)
  // report('Part two', partTwo)
}
