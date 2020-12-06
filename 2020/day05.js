function main (input, libs) {
  input = input
    .trim()
    .split(/\n/)

  main.libs = libs

  partOne(input, (...args) => libs.report('Part one', ...args))
  partTwo(input, (...args) => libs.report('Part two', ...args))
}

function partOne (input, report) {
  const result = Math.max(...input.map(seat))

  report(result, 965)
}

function partTwo (input, report) {
  const result = input
    .map(seat)
    .sort((a, b) => a - b)
    .filter((seatID, index, list) => seatID - list[index - 1] === 2)

  // because the number we are looking for is not in
  // the list, it is between two numbers in the list
  report(result - 1, 524)
}

function recursiveBSP (min, max, list, first = 'F') {
  const diff = Math.ceil((max - min) / 2)
  const front = list[0] === first

  /* eslint-disable no-nested-ternary */
  return list.length === 1
    ? front ? min : max
    : recursiveBSP(
      front ? min : min + diff,
      front ? max - diff : max,
      list.slice(1),
      first,
    )
  /* eslint-enable no-nested-ternary */
}

function seat (bsp) {
  const [row, col] = bsp
    .match(/^(\w{7})(\w{3})$/)
    .slice(1)

  return 8 * recursiveBSP(0, 127, row, 'F') + recursiveBSP(0, 7, col, 'L')
}

module.exports = main
