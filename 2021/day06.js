const example = `3,4,3,1,2`

module.exports = (input, {report}) => {
  input = input.trim().split(",").map(Number)

  const DAYS = 80

  const generate = (startingAge) => {
    let day = 0
    let fish = [startingAge]

    while (DAYS > day++) {
      fish = fish
        .concat(fish.filter((age) => age === 0).map(() => 9))
        .map((age) => age === 0 ? 6 : age - 1)
    }

    return fish
  }
  const table = [1, 2, 3, 4, 5]
    .reduce((acc, num) => ({...acc, [num]: generate(num).length}), {})

  const partOne = input
    .map((num) => table[num])
    .reduce((a, b) => a + b)

  const partTwo = input

  report('Part one', partOne, 379414)
  // report('Part two', partTwo)
}
