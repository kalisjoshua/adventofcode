const cleanRawInput = (raw) => raw
  .trim()
  .split(/\n\n+/)
  .map((list) => sum(list.split(/\n+/).map((n) => parseInt(n, 10))))
const sortFn = (a, b) => a - b
const sum = (ar) => ar.reduce((a, b) => a + b, 0)

function partOne (input, report, answer) {
  const result = Math.max(...input)

  report('Part one', result, answer)
}

function partTwo (input, report, answer) {
  const SIZE = 3

  const result = sum(input
    .slice(SIZE)
    .reduce((acc, num) => (num > acc[0])
      ? acc.slice(1).concat(num).sort(sortFn)
      : acc, input.slice(0, SIZE).sort(sortFn)))
  
  report('Part one', result, answer)
}

module.exports = (raw, {report}) => {
  const input = cleanRawInput(raw)

  partOne(input, report, 72511)
  partTwo(input, report, 212117)
}
