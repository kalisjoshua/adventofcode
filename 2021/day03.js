const bitFlipper = (str) => str.split("").map((b) => 1 - b).join("")

const example = `
00100
11110
10110
10111
10101
01111
00111
11100
10000
11001
00010
01010
`.trim().split(/\n/)

function finder (common, list, index = 0) {
  if (list.length === 1) return parseInt(list[0], 2)

  const digits = list.map((num) => parseInt(num[index], 10))
  const ones = digits.filter(n => n).length
  const zeros = digits.length - ones
  const filterValue = common
    ? (ones > zeros ? 1 : (ones === zeros ? common : 0))
    : (ones > zeros ? 0 : (ones === zeros ? common : 1))
  const filteredList = list.filter((num) => num[index] == filterValue)

  return finder(common, filteredList, index + 1)
}

module.exports = (input, {report}) => {
  input = input
    .trim()
    .split(/\n/)

  const partOne = input
    .reduce((acc, bin) => {
      const bits = bin
        .split("")
        .map(Number)

      return bits
        .map((bit, index) => (acc[index] || 0) + (+bit ? 1 : -1))
    }, [])
    .map((count) => count > 0 ? 1 : 0)
    .join("")
    .split()
    .flatMap((gamma) => [gamma, bitFlipper(gamma)])
    .map((num) => parseInt(num, 2))
    .reduce((gamma, epsilon) => gamma * epsilon)

  const partTwo = [
    finder(1, input),
    finder(0, input),
  ].reduce((a, b) => a * b)

  report('Part one', partOne, 3148794)
  report('Part two', partTwo, 2795310)
}
