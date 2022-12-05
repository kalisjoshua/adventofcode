const NOPE = Symbol('NOPE')
const cleanRawInput = (raw) => raw
  .split(/\n/)
  .reduce((acc, line) => {
    if (!line.length) {
      acc.push([])
    } else if (/^[\s\d]+$/.test(line)) {
      // noop
    } else {
      acc.slice(-1)[0].push(line)
    }

    return acc
  }, [[]])

// const pretty = (stacks) => stacks
//   .map((stack, index) => `${index + 1} - ${stack.reverse().join(' ')}`)
//   .join('\n')

function parseInput (raw) {
  const input = cleanRawInput(raw)

  const moves = input[1]
    .map((line) => line.match(/\d+/g))

  const stacks = input[0]
    .flatMap((line) => {
      const result = line
        .split('')
        .reduce((acc, c, i) => {
          if (/\w/.test(c)) {
            acc.push([c, (i - 1) / 4])
          }

          return acc
        }, [])
      return result
    })
    .reduce((acc, [label, stack]) => {
      if (!acc[stack]) {
        acc[stack] = []
      }

      acc[stack].push(label)

      return acc
    }, [])

  return { moves, stacks }
}

function partOne(input, report, answer) {
  const {moves, stacks} = input
  const result = moves
    .reduce((stacks, [count, from, to]) => {
      while (count--) {
        stacks[to - 1].unshift(stacks[from - 1].shift())
      }

      return stacks
    }, stacks)
    .map(([top]) => top)
    .join('')

  report('Part one', result, answer)
}

function partTwo(input, report, answer) {
  const {moves, stacks} = input
  console.log(stacks)
  // console.log(pretty(stacks), '\n')
  // const result = moves
  //   .slice(0, 1)
  //   .reduce((stacks, [count, from, to]) => {
  //     stacks[to - 1].unshift(...stacks[from - 1].splice(0, count))

  //     console.log({count, from, to})
  //     console.log(pretty(stacks), '\n')

  //     return stacks
  //   }, stacks)
  //   .map(([top]) => top)
  //   .join('')

  // report('Part one', result, answer)
}

module.exports = (raw, { report }) => {
  const input = parseInput(raw)
  const example = parseInput(`    [D]
[N] [C]
[Z] [M] [P]
 1   2   3

move 1 from 2 to 1
move 3 from 1 to 3
move 2 from 2 to 1
move 1 from 1 to 2`)

  partOne(input, report, 'TGWSMRBPN')
  partTwo(input, report, NOPE)
}
