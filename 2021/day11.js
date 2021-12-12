const example = `
5483143223
2745854711
5264556173
6141336146
6357385478
4167524645
2176841721
6882881134
4846848554
5283751526
`
const GRID_SIZE = example.trim().split(/\n/)[0].length

const ex = (s, n) => n < 0 || n >= s
const flatIndex = (size, x, y) => ex(size, x) || ex(size, y) ? -1 : y * size + x

function getIndexes (size, index) {
  if (index < 0 || index >= size ** 2) {
    throw new Error(`Invlaid index "${index}" given for size ${size}x${size}.`)
  }

  const [x, y] = [index % size, Math.floor(index / size)]

  return [
    flatIndex(size, x - 1, y - 1), // north east
    flatIndex(size, x - 0, y - 1), // north
    flatIndex(size, x + 1, y - 1), // north west

    flatIndex(size, x - 1, y - 0), // west
    flatIndex(size, x + 1, y - 0), // east

    flatIndex(size, x - 1, y + 1), // south east
    flatIndex(size, x - 0, y + 1), // south
    flatIndex(size, x + 1, y + 1), // south west
  ]
  .filter((num) => num >= 0)
}

function step (octopodes) {
  const list = octopodes
    .map((octopus) => octopus + 1)

  do {
    list.forEach((_, index) => {
      if (list[index] > 9) {
        list[index] = 0
        getIndexes(GRID_SIZE, index)
          .forEach((i) => list[i] === 0 ? 0 : list[i] += 1)
      }
    })
  } while (list.some((octopus) => octopus > 9))

  return list
}

// const show = (list) => console.log(list.join("").match(/\d{10}/g).join("\n"), "\n")

function partOne (input) {
  let count = 100
  let flashes = 0

  while (count--) {
    input = step(input)
    flashes += input.filter((num) => num === 0).length
  }

  return flashes
}

function partTwo (input) {
  let count = 0
  let list = input.slice(0)

  do {
    list = step(list)
    count++
  } while (!list.every((num) => num === 0) && count < 400)

  return count
}

module.exports = (input, {report}) => {
  input = input
    .trim()
    .split(/\n/)
    .flatMap((line) => line.split("").map(Number))

  report('Part one', partOne(input), 1702)
  report('Part two', partTwo(input), 251)
}
