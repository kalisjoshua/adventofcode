const cleanInput = (input) => input
  .trim()
  .split(/\n/)

const compass = (function fn (facing = 'E') {
  return new Proxy({
    turn: (degrees) => {
      facing = 'NESW'[('NESW'.indexOf(facing) + (360 + degrees) / 90) % 4]
    },
  }, {get: (target, prop) => (prop === 'facing' ? facing : target[prop])})
}())

function main (input, libs) {
//   input = `
// F10
// N3
// F7
// R90
// F11`
  input = cleanInput(input)

  main.libs = libs

  partOne(input, (...args) => libs.report('Part one', ...args))
  partTwo(input, (...args) => libs.report('Part two', ...args))
}

function partOne (input, report) {
  const ferry = (function iife () {
    let facing = 'E'
    const coords = [0, 0]

    function turn (degrees) {
      facing = 'NESW'[('NESW'.indexOf(facing) + (360 + degrees) / 90) % 4]
    }

    return {
      adjust: (inst) => {
        const [action, value] = [inst[0], parseInt(inst.slice(1), 10)]
        const axis = /[NS]/.test(facing) ? 0 : 1
        const positive = /[NE]/.test(facing)

        switch (action) {
          case 'F': coords[axis] += (positive ? value : -value); break
          case 'L': turn(-value); break
          case 'R': turn(+value); break
          case 'N': coords[0] += value; break
          case 'S': coords[0] -= value; break
          case 'E': coords[1] += value; break
          case 'W': coords[1] -= value; break
          default: throw new Error(`Unrecognized action "${action}".`)
        }
      },
      getDistance: () => Math.abs(coords[0]) + Math.abs(coords[1]),
    }
  }())

  input.forEach(ferry.adjust)
  const result = ferry.getDistance()

  report(result, 882)
}

function partTwo (input, report) {
  // const result = input

  report()
}

module.exports = main
