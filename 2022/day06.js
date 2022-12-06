const NOPE = Symbol('NOPE')
const cleanRawInput = (raw) => raw
  .trim()
  .split('')

const search = (length = 4) => (found, char, index, list) => {
  if (!found && index >= length) {
    const start = Math.max(index - length, 0)
    const slice = new Set(list.slice(start, start + length))

    if (slice.size === length) {
      found = index
    }
  }

  return found
}

function partOne(input, report, answer) {
  const result = input
    .reduce(search(4), false)

  report('Part one', result, answer)
}

function partTwo(input, report, answer) {
  const result = input
    .reduce(search(14), false)

  report('Part one', result, answer)
}

module.exports = (raw, { report }) => {
  const input = cleanRawInput(raw)
  // ;[
  //   [cleanRawInput(`mjqjpqmgbljsphdztnvjfqwrcgsmlb`), 7],
  //   [cleanRawInput(`bvwbjplbgvbhsrlpgdmjqwftvncz`), 5],
  //   [cleanRawInput(`nppdvjthqldpwncqszvftbrmjlhg`), 6],
  //   [cleanRawInput(`nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg`), 10],
  //   [cleanRawInput(`zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw`), 11],
  // ].forEach(([input, expected]) => {partOne(input, report, expected)})
  // ;[
  //   [cleanRawInput(`mjqjpqmgbljsphdztnvjfqwrcgsmlb`), 19],
  //   [cleanRawInput(`bvwbjplbgvbhsrlpgdmjqwftvncz`), 23],
  //   [cleanRawInput(`nppdvjthqldpwncqszvftbrmjlhg`), 23],
  //   [cleanRawInput(`nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg`), 29],
  //   [cleanRawInput(`zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw`), 26],
  // ].forEach(([input, expected]) => {partTwo(input, report, expected)})

  partOne(input, report, 1100)
  partTwo(input, report, 2421)
}
