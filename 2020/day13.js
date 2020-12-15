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
  const [earliest, ...buses] = input
    .reduce((acc, schedule) => [acc, ...schedule.split(',')])
    .filter(Number)
    .map(Number)
  const {result} = buses
    .reduce((acc, busID) => {
      const overtime = (1 + Math.floor(earliest / busID)) * busID - earliest

      if (acc.overtime > overtime) {
        acc.busID = busID
        acc.overtime = overtime
        acc.result = busID * overtime
      }

      return acc
    }, {overtime: Number.MAX_SAFE_INTEGER})

  report(result, 104)
}

function partTwo (input, report) {
  const schedule = input.pop()
    .split(',')
    .reduce((acc, num, index) => (
      num === 'x'
        ? acc
        : acc.concat([[BigInt(num), BigInt(index)]])
    ), [])

  /* source https://github.com/matthewgehring/adventofcode/blob/main/2020/day13/script.js */
  const gcd = (a, b) => (a === BigInt(0) ? b : gcd(b % a, a))
  const modInverse = (a, m) => (gcd(a, m) ? power(a, m - BigInt(2), m) : undefined)

  function magic (buses) {
    const N = buses
      .reduce((a, [b]) => a * b, BigInt(1))
    const Ni = buses
      .map(([d]) => N / d)
    const diffs = buses
      .map(([id, offset], i) => (i === 0 ? BigInt(0) : id - offset))
    const x = buses
      .map(([id], i) => modInverse(Ni[i], id))
    const sum = Ni
      .map((item, i) => item * diffs[i] * x[i])
      .reduce((a, b) => a + b)

    return sum - (sum / N) * N
  }

  function power (x, y, m) {
    if (y === BigInt(0)) {
      return BigInt(1)
    }

    let p = power(x, y / BigInt(2), m) % m

    p = (p * p) % m

    return y % BigInt(2) === BigInt(0)
      ? p
      : (x * p) % m
  }
  /* source https://github.com/matthewgehring/adventofcode/blob/main/2020/day13/script.js */

  const result = parseInt(magic(schedule), 10)

  report(result, 842186186521918)
}

module.exports = main
