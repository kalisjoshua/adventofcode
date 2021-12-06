const example = `3,4,3,1,2`

// source: https://www.reddit.com/r/adventofcode/comments/r9z49j/comment/hngsh82/?utm_source=share&utm_medium=web2x&context=3
function sourcedSolution (fish, days) {
  const list = fish
    .reduce((counts, startingAge) => {
      ++counts[startingAge]

      return counts
    }, new Array(9).fill(0))

  while (days--){
    const num = list.shift()

    list[6] += list[8] = num
  }

  return list
    .reduce((a, b) => a + b)
}

module.exports = (input, {report}) => {
  input = input.trim().split(",").map(Number)

  const partOne = sourcedSolution(input, 80)

  const partTwo = sourcedSolution(input, 256)

  report('Part one', partOne, 379414)
  report('Part two', partTwo)
}
