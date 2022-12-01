const sum = (ar) => ar.reduce((a, b) => a + b, 0)

module.exports = (input, {report}) => {
  input = input
    .trim()
    .split(/\n\n+/)
    .map((list) => sum(list.split(/\n+/).map((n) => parseInt(n, 10))))

  const partOneAnswer = 72511
  const partOne = Math.max(...input)

  const partTwoAnswer = 212117
  const sortFn = (a, b) => a - b
  const size = 3
  const partTwo = sum(input
    .slice(size)
    .reduce((acc, num) => (num > acc[0])
      ? acc.slice(1).concat(num).sort(sortFn)
      : acc, input.slice(0, size).sort(sortFn)))

  report('Part one', partOne, partOneAnswer)
  report('Part two', partTwo, partTwoAnswer)
}
