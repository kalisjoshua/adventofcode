const example = `16,1,2,0,4,2,7,1,2,14`

module.exports = (input, {report}) => {
  input = input.trim().split(",").map(Number)

  const sorted = input.sort((a, b) => a - b)
  const mean = Math.floor(input.reduce((a, b) => a + b) / input.length)
  const midpoint = Math.floor(input.length / 2)
  const median = Math.floor((sorted[midpoint] + sorted[midpoint]) / 2)

  const partOne = input
    .reduce((acc, pos) => acc + Math.abs(median - pos), 0)

  const partTwo = input
    .reduce((acc, pos) => acc + Array(Math.abs(mean - pos)).fill()
      .reduce((a, _, i) => a + i + 1, 0), 0)

  report('Part one', partOne, 339321)
  report('Part two', partTwo, 95476244)
}
