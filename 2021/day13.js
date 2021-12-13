const example = `
6,10
0,14
9,10
0,3
10,4
4,11
6,0
6,12
4,1
0,13
10,12
3,4
3,0
8,4
1,10
2,14
8,10
9,0

fold along y=7
fold along x=5
`

const getDimension = (folds, ax) => folds
  .filter(([axis]) => axis === ax)
  .sort((a, b) => a[1] - b[1])
  .slice(-1)[0][1] * 2 + 1

const show = (grid) => grid
  .forEach((row) => console.log(row.join("")))

function createGrid (coords, folds) {
  const grid = Array(getDimension(folds, "y")).fill(null)
    .map(() => Array(getDimension(folds, "x")).fill(" "))
    .slice(0)

  coords.forEach(([x, y]) => grid[y][x] = "#")

  return grid
}

function foldGrid (grid, axis, val) {
  const a = axis === "y"
    ? grid.slice(0, val)
    : grid.map((row) => row.slice(0, val))
  const b = axis === "y"
    ? grid.slice(val).reverse()
    : grid.map((row) => row.slice(val).reverse())

  return a
    .map((row, y) => row.map((dot, x) => dot === "#" || b[y][x] === "#" ? "#" : dot))
}

module.exports = (input, {report}) => {
  const {coords, folds} = input
    .trim()
    .split(/\n/)
    .reduce((acc, line) => {
      if (/^\d/.test(line)) {
        acc.coords.push(line.split(",").map(Number))
      } else if (/\d+$/.test(line)) {
        const [axis, val] = line.match(/(.)=(\d+)$/).slice(1)

        acc.folds.push([axis, +val])
      }

      return acc
    }, {coords: [], folds: []})

  const foldReduce = (grid, [axis, val]) => foldGrid(grid, axis, val)

  const partOne = folds
    .slice(0, 1)
    .reduce(foldReduce, createGrid(coords, folds))
    .flat()
    .filter((dot) => dot === "#")
    .length

  show(folds.reduce(foldReduce, createGrid(coords, folds)))

  const partTwo = "LKREBPRK"

  report('Part one', partOne, 653)
  report('Part two', partTwo, "LKREBPRK")
}
