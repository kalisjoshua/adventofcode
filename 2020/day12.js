const cleanInput = (input) => input
  .trim()
  .split(/\n/)

function main (input, libs) {
  input = cleanInput(input)

  main.libs = libs

  partOne(input, (...args) => libs.report('Part one', ...args))
  partTwo(input, (...args) => libs.report('Part two', ...args))
}

function partOne (input, report) {
  let bearing = 'E'
  const coords = [0, 0]

  function rotate (value) {
    bearing = 'NESW'[('NESW'.indexOf(bearing) + (360 + value) / 90) % 4]
  }

  input
    .forEach((line) => {
      const [action, value] = [line[0], parseInt(line.slice(1), 10)]

      switch (action) {
        case 'F':
          coords[/[NS]/.test(bearing) ? 0 : 1] += /[NE]/.test(bearing)
            ? value
            : -value
          break
        case 'L': rotate(-value); break
        case 'R': rotate(+value); break
        case 'N': coords[0] += value; break
        case 'S': coords[0] -= value; break
        case 'E': coords[1] += value; break
        case 'W': coords[1] -= value; break
        default: throw new Error(`Unrecognized action "${action}".`)
      }

      return []
    })

  const result = Math.abs(coords[0]) + Math.abs(coords[1])

  report(result, 882)
}

function partTwo (input, report) {
  let bearing = [1, 10]
  const coords = [0, 0]

  function rotate (value) {
    let turns = ((360 + value) / 90) % 4

    while (turns) {
      bearing = [-bearing[1], bearing[0]]
      turns -= 1
    }
  }

  input
    .forEach((line) => {
      const [action, value] = [line[0], parseInt(line.slice(1), 10)]

      switch (action) {
        case 'F':
          coords[0] += bearing[0] * value
          coords[1] += bearing[1] * value
          break
        case 'L': rotate(-value); break
        case 'R': rotate(+value); break
        case 'N': bearing[0] += value; break
        case 'S': bearing[0] -= value; break
        case 'E': bearing[1] += value; break
        case 'W': bearing[1] -= value; break
        default: throw new Error(`Unrecognized action "${action}".`)
      }

      return []
    })

  const result = Math.abs(coords[0]) + Math.abs(coords[1])

  report(result, 28885)
}

module.exports = main
