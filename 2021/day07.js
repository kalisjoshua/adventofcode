const example = `16,1,2,0,4,2,7,1,2,14`

function find (list) {
  const empty = Array(Math.max(...list)).fill(0)
  const counts = list
    .reduce((counts, num) => (counts[num - 1] += 1, counts), empty)
    .map((count, index) => [count, index + 1])
    .filter(([count]) => count > 2)
    // .sort((a, b) => b[0] - a[0])
    .sort((a, b) => (b[0] * b[1]) - (a[0] * a[1]))

  console.log(counts)

  return counts
    .map(([_, num]) => num)
}

module.exports = (input, {report}) => {
  input = input.trim().split(",").map(Number)

  const partOne = find(input)

  const partTwo = input

  report('Part one', partOne)
  // report('Part two', partTwo)
}
