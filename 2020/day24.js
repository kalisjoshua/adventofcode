const cleanInput = (input) => input
  .trim()
  .split(/\n/)
  .map((line) => line
    .match(/(?:e|w|se|sw|ne|nw)/g)
    .reduce(([x, y, z], move) => ([
      x + ({e: 1, se: 1, nw: -1, w: -1}[move] || 0),
      y + ({e: 1, ne: 1, sw: -1, w: -1}[move] || 0),
      z + ({n: 1, s: -1}[move.match(/n|s/)] || 0),
    ]), [0, 0, 0]))

function main (input, libs) {
  input = cleanInput(input)

  main.libs = libs

  partOne(input, (...args) => libs.report('Part one', ...args))
  partTwo(input, (...args) => libs.report('Part two', ...args))
}

function partOne (input, report) {
  const coords = input
    .reduce((map, point) => {
      const key = point.join()

      map[key] = (map[key] || 0) + 1

      return map
    }, {})
  const result = Reflect.ownKeys(coords)
    .filter((key) => coords[key] % 2 === 1)
    .length

  report(result, 263)
}

function partTwo (input, report) {
  // const result = input

  report()
}

module.exports = main
