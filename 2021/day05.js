const example = `
0,9 -> 5,9
8,0 -> 0,8
9,4 -> 3,4
2,2 -> 2,1
7,0 -> 7,4
6,4 -> 2,0
0,9 -> 2,9
3,4 -> 1,4
0,0 -> 8,8
5,5 -> 8,2
`

const diff = (i, end, first) =>
  first[i] === end[i] ? 0 : first[i] > end[i] ? -1 : 1

module.exports = (input, {report}) => {
  input = input.trim().split(/\n/)

  const orthogonalGrid = input
    .reduce((acc, line) => {
      const [x1, y1, x2, y2] = line.match(/\d+/g).map(Number)

      if (x1 === x2 || y1 === y2) {
        const coord = (pos) => x1 === x2 ? [x1, pos] : [pos, y1]
        const [start, end] = (x1 === x2 ? [y1, y2] : [x1, x2]).sort((a, b) => a - b)
        const list = Array.from(Array(end - start + 1), (_, i) => start + i)
          .map((pos) => coord(pos).join())
          .forEach((point) => acc[point] = 1 + (acc[point] || 0))
      }

      return acc
    }, {})

  const fullGrid = input
    .reduce((acc, point) => {
      const [start, end] = point
        .split(/\s+->\s+/)
        .map((point) => point.split(",").map(Number))
      const line = [start]

      do {
        const first = line[0]
        // const xDiff = first[0] === end[0] ? 0 : first[0] > end[0] ? -1 : 1
        const xDiff = diff(0, end, first)
        // const yDiff = first[1] === end[1] ? 0 : first[1] > end[1] ? -1 : 1
        const yDiff = diff(1, end, first)

        line.unshift([first[0] + xDiff, first[1] + yDiff])
      } while (start[0] === end[0] ? line[0][1] !== end[1] : line[0][0] !== end[0])

      line.forEach((point) => acc[point] = (acc[point] || 0) + 1)

      return acc
    }, {})

  const partOne = Reflect.ownKeys(orthogonalGrid)
    .reduce((acc, point) => acc + (orthogonalGrid[point] > 1 ? 1 : 0), 0)

  const partTwo = Object.values(fullGrid)
    .filter((count) => count > 1)
    .length

  // for (let x = 0; x < 10; x++) {
  //   let line = ""
  //
  //   for (let y = 0; y < 10; y++) {
  //     line += fullGrid[`${y},${x}`] || "."
  //   }
  //
  //   console.log(line)
  // }

  report('Part one', partOne, 5145)
  report('Part two', partTwo)
}
