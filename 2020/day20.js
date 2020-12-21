const cleanInput = (input) => input
  .trim()
  .split(/\n\n/)
  .map((str) => str.split(/\n/))
  .map(([id, ...grid]) => ({
    id: id.match(/\d+/)[0],
    source: grid.join('\n'),
  }))

function main (input, libs) {
  input = cleanInput(input)

  main.libs = libs

  partOne(input, (...args) => libs.report('Part one', ...args))
  partTwo(input, (...args) => libs.report('Part two', ...args))
}

function partOne (input, report) {
  const faces = (grid) => ({
    ...grid,
    bottom: grid.source.split('\n').slice(-1)[0],
    left: grid.source.split('\n').map(([c]) => c).join(''),
    right: grid.source.split('\n').map((line) => line.slice(-1)[0]).join(''),
    top: grid.source.split('\n')[0],
  })
  const makeConnections = (grid) => input
    .forEach((pair) => {
      grid.connections = grid.connections || {}
      pair.connections = pair.connections || {}

      if (grid.right === pair.left) {
        grid.connections.right = pair
      }

      if (grid.left === pair.right) {
        grid.connections.left = pair
      }

      if (grid.bottom === pair.top) {
        grid.connections.bottom = pair
      }

      if (grid.top === pair.bottom) {
        grid.connections.top = pair
      }
    })
  const flip = (grid) => {
    grid.source = grid.source
      .split(/\n/)
      .reverse()
      .join('\n')

    return faces(grid)
  }
  const rotate = (grid) => {
    grid.source = grid.source
      .split(/\n/)
      .map((s) => s.split('').reverse().join(''))
      .join('\n')

    return faces(grid)
  }
  const unconnected = (grid) => Reflect.ownKeys(grid.connections).length === 0

  input = input.map(faces)

  input.forEach(makeConnections)

  input
    .filter(unconnected)
    // .map(flip)
    .map(rotate)

  input.forEach(makeConnections)
  // console.log(input.filter(unconnected))

  const topLeft = input
    .filter((grid) => /^(?:right|bottom){2}$/.test(Reflect.ownKeys(grid.connections).join('')))[0]

  // console.log(topLeft.id)
  // console.log(topLeft.connections.right.id)
  // console.log(topLeft.connections.right)

  report()
}

function partTwo (input, report) {
  // const result = input

  report()
}

module.exports = main
