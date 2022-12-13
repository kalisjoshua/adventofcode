const NOPE = Symbol('NOPE')
const cleanRawInput = (raw) => raw
  .trim()
  .split(/\n/)
  .reduce(parser, {map: []})
const ELEVATIONS = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']

function parser (acc, line, y) {
  acc.map.push(line.split(''))
  acc.oneline += line

  const E = line.indexOf('E')
  const S = line.indexOf('S')

  if (E > -1) {
    acc.end = [E, y]
  }

  if (S > -1) {
    acc.start = [S, y]
  }

  return acc
}

function partOne(input, report, answer) {
  const {end, map, oneline, start} = input
  const path = walk(end, map, start)
  console.log({path})

  const result = Symbol('WIP')

  report('Part one', result, answer)
}

function partTwo(input, report, answer) {
  const result = input

  report('Part two', result, answer)
}

function walk(end, map, start, path = []) {
  if (end[0] === start[0] && end[1] === start[1]) return path

  const directions = [
    map[start[1] - 1] && map[start[1] - 1][start[0]] && [start[0], start[1] - 1], // N
    map[start[1] + 1] && map[start[1] + 1][start[0]] && [start[0], start[1] + 1], // S
    map[start[1]][start[0] - 1] && [start[0] - 1, start[1]], // E
    map[start[1]][start[0] + 1] && [start[0] + 1, start[1]], // W
  ]

  return directions
    .filter(Boolean)
    // .map((next) => path.concat(start).concat(next))
}

module.exports = (raw, { report }) => {
  const input = cleanRawInput(raw)
  const example = cleanRawInput(`
Sabqponm
abcryxxl
accszExk
acctuvwj
abdefghi`)


  partOne(example, report, NOPE)
  // partTwo(input, report, NOPE)
}
