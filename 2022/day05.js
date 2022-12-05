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
const copy = (obj) => JSON.parse(JSON.stringify(obj))
const pretty = (stacks) => stacks
  .map((stack, index) => `${index + 1} - ${stack.slice(0).reverse().join(' ')}`)
  .join('\n')

function parseInput (raw) {
  const input = cleanRawInput(raw)

  const moves = input[1]
    .map((line) => line.match(/\d+/g))

  const stacks = input[0]
    .flatMap((line) => line
        .split('')
        .reduce((acc, c, i) => {
          if (/\w/.test(c)) {
            acc.push([c, (i - 1) / 4])
          }

          return acc
        }, []))
    .reduce((acc, [label, stack]) => {
      if (!acc[stack]) {
        acc[stack] = []
      }

      acc[stack].push(label)

      return acc
    }, [])

  return {moves, stacks}
}

function partOne(input, report, answer) {
  const {moves, stacks} = copy(input)
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
  const {moves, stacks} = copy(input)
  const result = moves
    .reduce((stacks, [count, from, to]) => {
      stacks[to - 1].unshift(...stacks[from - 1].splice(0, count))

      return stacks
    }, stacks)
    .map(([top]) => top)
    .join('')

  report('Part one', result, answer)
}

module.exports = (raw, { report }) => {
  const input = parseInput(raw)

  partOne(input, report, 'TGWSMRBPN')
  partTwo(input, report, 'TZLTLWRNF')
}
