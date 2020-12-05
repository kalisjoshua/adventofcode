(function reload (module, {watch}) {
  watch(module, () => {delete require.cache[module]})
}(require('path').resolve(__dirname, 'computor.js'), require('fs')))

function computor (memory, offset = 0, log = []) {
  memory = memory.base === undefined
    ? {base: 0, program: memory}
    : memory

  let {base} = memory
  const {program} = memory

  if (offset > program.length) throw new Error('Index out of bounds') // needed?

  const indexes = program[offset].padStart(5, 0)
    .split('').reverse().slice(2, 5) // isolates only three modes as an array
    .map((mode, index) => {
      const modeI = parseInt(mode, 10)
      /* eslint-disable no-multi-spaces */
      const position  = modeI === 0 &&         program[offset + index + 1]
      const immediate = modeI === 1 &&                 offset + index + 1
      const relative  = modeI === 2 && base + +program[offset + index + 1]
      /* eslint-enable no-multi-spaces */

      return position || immediate || relative
    })
  const get = (index) => +program[indexes[index]]
  const set = (index, val = '') => {
    program[indexes[index]] = `${val}`

    return program[indexes[index]]
  }

  const next = (nextOffset) => (
    parseInt(program[nextOffset], 10) === 99
      ? {done: true, log, program}
      : computor({base, program}, nextOffset, log)
  )

  switch (+program[offset].slice(-1)) {
    /* eslint-disable newline-before-return, no-multi-spaces */
    case  1: set(2, get(0) + get(1));                  return next(offset + 4)
    case  2: set(2, get(0) * get(1));                  return next(offset + 4)
    case  3:       return {next: (input) => (set(0, input) && next(offset + 2))}
    case  4: log.push(get(0));       return {log, next: () => next(offset + 2)}
    case  5:                   return next(get(0) !== 0 ? get(1) : offset + 3)
    case  6:                   return next(get(0) === 0 ? get(1) : offset + 3)
    case  7: set(2, get(0)  <  get(1) ? 1 : 0);        return next(offset + 4)
    case  8: set(2, get(0) === get(1) ? 1 : 0);        return next(offset + 4)
    case  9: base += get(0);                           return next(offset + 2)
    default: throw new Error(`Invalid opCode; ${program[offset]}.`) // needed?
    /* eslint-enable newline-before-return, no-multi-spaces */
  }
}

module.exports = computor
