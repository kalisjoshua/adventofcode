function main (input, {range, report, trace}) {
  input = {
    410: `R98,U47,R26,D63,R33,U87,L62,D20,R33,U53,R51
          U98,R91,D20,R16,D67,R40,U7,R15,U6,R7`.split(/\n/).map((s) => s.trim()),
    610: `R75,D30,R83,U83,L12,D49,R71,U7,L72
          U62,R66,U55,R34,D71,R55,D58,R83`.split(/\n/).map((s) => s.trim()),
    full: input
      .trim()
      .split("\n")
  }

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

    return range(length)
      .map(op[direction.toUpperCase()](start.map(Number)))
  }

  trace("Begin")

  const wires = input["full"]
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

  const shortestPath = intersections
    .map((point) => wires.map((w) => w.indexOf(point)).reduce((a, b) => +a + +b))
    .sort((a, b) => a - b)
    // plus two because; 1) it's an index, and 2) it doesn't count the origin
    .shift() + 2

  trace("Shortest")

  report('Part one', Math.min.apply(Math, distances), 280)
  report('Part two', shortestPath, 10554)
}

module.exports = main
