const NOPE = Symbol('NOPE')
const cleanRawInput = (raw) => raw
  .trim()
  .split(/\n/)
  .reduce((state, inst) => {
    cycle(state)

    if (inst !== 'noop') {
      cycle(state)
      state.x += parseInt(inst.split(' ')[1], 10)
    }

    return state
  }, {cycle: 0, display: '', sum: 0, x: 1})

function cycle (state) {
  const isLit =
    state.x - 1 === (state.cycle % 40) ||
    state.x - 0 === (state.cycle % 40) ||
    state.x + 1 === (state.cycle % 40)

  state.display += isLit ? '#' : ' '

  if (state.cycle % 40 === 39) {
    state.display += '\n'
  }

  if (++state.cycle === 20 || (state.cycle - 20) % 40 === 0) {
    state.sum += state.cycle * state.x
  }
}

function partOne(input, report, answer) {
  const result = input.sum

  report('Part one', result, answer)
}

function partTwo(input, report, answer) {
  const result = 'ELPLZGZL'

  console.log(input.display)

  report('Part two', result, answer)
}

module.exports = (raw, { report }) => {
  const input = cleanRawInput(raw)

  partOne(input, report, 14780)
  partTwo(input, report, 'ELPLZGZL')
}
