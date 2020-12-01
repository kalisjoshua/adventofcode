const resolveModes = (offset, program, base) => program[offset].padStart(5, 0)
  .split("").reverse().slice(2, 5) // isolates only three modes as an array
  .map((mode, index) =>
    mode == 0 &&         program[offset + index + 1] || // position
    mode == 1 &&                 offset + index + 1  || // immediate
    mode == 2 && base + +program[offset + index + 1]  ) // relative

function computor (memory, offset = 0, log = []) {
  let {base = 0, program} = memory.base === void 0 ? {program: memory} : memory

  if (offset > program.length) throw new Error("Index out of bounds") // needed?

  const indexes = resolveModes(offset, program, base)
  const get = (index) => +program[indexes[index]]
  const set = (index, val) => program[indexes[index]] = (val || "").toString()

  const next = (nextOffset) => program[nextOffset] == 99
    ? {done: true, log, program}
    : computor({base, program}, nextOffset, log)

  switch (+program[offset].slice(-1)) {
    case  1: set(2, get(0) + get(1));                  return next(offset + 4)
    case  2: set(2, get(0) * get(1));                  return next(offset + 4)
    case  3:         return {next: (input) => (set(0, input), next(offset + 2))}
    case  4: log.push(get(0));       return {log, next: () => next(offset + 2)}
    case  5:                   return next(get(0) !== 0 ? get(1) : offset + 3)
    case  6:                   return next(get(0) === 0 ? get(1) : offset + 3)
    case  7: set(2, get(0)  <  get(1) ? 1 : 0);        return next(offset + 4)
    case  8: set(2, get(0) === get(1) ? 1 : 0);        return next(offset + 4)
    case  9: base += get(0);                           return next(offset + 2)
    default: throw new Error(`Invalid opCode; ${program[offset]}.`)   // needed?
  }
}

module.exports = computor
