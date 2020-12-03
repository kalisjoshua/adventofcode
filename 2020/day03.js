const TREE = '#'

function main (input, {report}) {
  input = input
    .split(/\n/)

  partOne(input, (...args) => report('Part one', ...args))
  partTwo(input, (...args) => report('Part two', ...args))
}

function partOne (input, report) {
  const result = toboggan(input, 3)

  report(result, 151)
}

function partTwo (input, report) {
  const runs = [
    toboggan(input, 1),
    toboggan(input, 3),
    toboggan(input, 5),
    toboggan(input, 7),
    toboggan(input, 1, 2),
  ]

  const result = runs.reduce((a, b) => a * b)

  report(result, 7540141059)
}

function toboggan (input, horizontal, vertical = 1) {
  let count = 0
  let h = horizontal
  let v = vertical

  do {
    const char = input[v % input.length][h % input[0].length]

    if (char === TREE) {
      count += 1
    }

    h += horizontal
    v += vertical
  } while (v < input.length)

  return count
}

module.exports = main
