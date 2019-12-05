const input = process.argv[2]
  .trim()
  .split("\n")

const createArray = (len) =>
  Array.apply(0, new Array(+len)).map((_, i) => i + 1)

const trace = (function () {
  let last = new Date()

  return (s) => {
    const time = ((new Date()) - last).toString().padStart(6, " ")

    last = new Date()

    // eslint-disable-next-line no-console
    console.log(`${s.padEnd(14, " ")} ${time} ms elapsed`)
  }
}())

const op = {
  D: ([x, y]) => (movement) => [x, y - movement],
  L: ([x, y]) => (movement) => [x - movement, y],
  R: ([x, y]) => (movement) => [x + movement, y],
  U: ([x, y]) => (movement) => [x, y + movement],
}

function walk (accAll, all) {
  const movement = all
    .split(",")
    // a.slice(-1)[0] - start from the last point and continue "moving"
    .reduce((a, m) => [...a, ...wire(a.slice(-1)[0], m)], [[0,0]])

  trace("Walk")

  return [...accAll, movement]
}

function wire (start, command) {
  const [direction, length] = command
    .match(/^([dlru])(\d+)$/i)
    .slice(1)

  return createArray(length)
    .map(op[direction.toUpperCase()](start.map(Number)))
}

trace("Begin")

const wires = input
  .reduce(walk, [])
  // convert points notation from array ([x, y]) to string ("x,y")
  .reduce((a, g) => [...a, g.slice(1).map((p) => p.join())], [])

trace("Grid")

const intersections = wires
  // cheaty, comma operator use :)
  .reduce((a, b) => (b = new Set(b), a.filter((v) => b.has(v))))

trace("Intersections")

const distances = intersections
  .map((s) => s.split(",").reduce((a, b) => Math.abs(a) + Math.abs(b)))

trace("Distances")

// eslint-disable-next-line no-console
console.log(Math.min.apply(Math, distances))
