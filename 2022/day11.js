const NOPE = Symbol('NOPE')
const cleanRawInput = (raw) => raw
  .trim()
  .split(/\n/)
  .reduce(collect, [])
  .map(configure)

function collect (barrel, line) {
  line = line.trim()

  if (!line.length) return barrel

  const [_, first, arg] = line
    .match(/^(\w+)(?:.*:\s+(.+))?/) || []

  if (first === 'Monkey') {
    barrel.push([])
  } else {
    barrel.at(-1).push(arg)
  }

  return barrel
}

function configure ([items, op, test, ...pass], index) {
  const result = {
    id: `Monkey ${index}`,
    items: items.split(/,\s*/).map(Number),
    op: new Function('old', op.replace('new =', 'return')),
    test: new Function('x', test.replace('divisible by', 'return 0 === x %')),
    pass: pass.reverse().map((s) => parseInt(s.replace('throw to monkey ', ''), 10)),
  }

  return result
}

function partOne (input, report, answer) {
  let counter = 20

  while (counter--) {
    input.forEach((monkey, index) => {
      const {items, op, test, pass} = monkey
      const willPass = items.length

      monkey.inspections = monkey.inspections || 0

      items.forEach((worry) => {
        const passing = Math.floor(op(worry) / 3)

        monkey.inspections++
        input[pass[+!!test(passing)]].items
          .push(passing)
      })

      monkey.items = monkey.items
        .slice(willPass)
    })
  }

  const [a, b] = input
    .map(({inspections}) => inspections)
    .sort((a, b) => b - a)

  const result = a * b

  report('Part one', result, answer)
}

function partTwo (input, report, answer) {
  const result = 1

  report('Part two', result, answer)
}

module.exports = (raw, { report }) => {
  const input = cleanRawInput(raw)
    const example = cleanRawInput(`
Monkey 0:
  Starting items: 79, 98
  Operation: new = old * 19
  Test: divisible by 23
    If true: throw to monkey 2
    If false: throw to monkey 3

Monkey 1:
  Starting items: 54, 65, 75, 74
  Operation: new = old + 6
  Test: divisible by 19
    If true: throw to monkey 2
    If false: throw to monkey 0

Monkey 2:
  Starting items: 79, 60, 97
  Operation: new = old * old
  Test: divisible by 13
    If true: throw to monkey 1
    If false: throw to monkey 3

Monkey 3:
  Starting items: 74
  Operation: new = old + 3
  Test: divisible by 17
    If true: throw to monkey 0
    If false: throw to monkey 1`)

  partOne(input, report, 78678)
  partTwo(example, report, NOPE)
}
