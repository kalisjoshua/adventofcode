function main (input, libs) {
  input = input
    .trim()
    .split('')

  main.libs = libs

  partOne(input, (...args) => libs.report('Part one', ...args))
  partTwo(input, (...args) => libs.report('Part two', ...args))
}

function move ([grid, x, y], vector) {
  switch (vector) {
    case '<': x -= 1; break
    case '>': x += 1; break
    case '^': y += 1; break
    case 'v': y -= 1; break
  }

  const key = [x, y].join(',')

  grid[key] = (grid[key] || 0) + 1

  return [grid, x, y]
}

function partOne (input, report) {
  const [grid] = input
    .reduce((...args) => move(...args), [{'0,0': 1}, 0, 0])

  const result = Reflect.ownKeys(grid).length

  report(result, 2592)
}

function partTwo (input, report) {
  const [[santa], [robo]] = input
    .reduce(([santa, robo], vector, index) => {

      return index % 2
        ? [santa, move(robo, vector)]
        : [move(santa, vector), robo]
    }, [[{'0,0': 1}, 0, 0], [{'0,0': 1}, 0, 0]])

  const result = new Set([
    ...Reflect.ownKeys(santa),
    ...Reflect.ownKeys(robo),
  ]).size

  report(result, 2360)
}

module.exports = main
