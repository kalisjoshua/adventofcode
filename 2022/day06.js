const NOPE = Symbol('NOPE')
const cleanRawInput = (raw) => raw
  .trim()
  .split('')

function partOne(input, report, answer) {
  const result = input
    .reduce((found, char, index, list) => {
      if (!found && index >= 4) {
        const start = Math.max(index - 4, 0)
        const slice = new Set(list.slice(start, start + 4))

        if (slice.size === 4) {
          found = index
        }
      }

      return found
    }, false)

  report('Part one', result, answer)
}

function partTwo(input, report, answer) {
  const result = input

  report('Part one', result, answer)
}

module.exports = (raw, { report }) => {
  const input = cleanRawInput(raw)
  ;[
    [cleanRawInput(`mjqjpqmgbljsphdztnvjfqwrcgsmlb`), 7],
    [cleanRawInput(`bvwbjplbgvbhsrlpgdmjqwftvncz`), 5],
    [cleanRawInput(`nppdvjthqldpwncqszvftbrmjlhg`), 6],
    [cleanRawInput(`nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg`), 10],
    [cleanRawInput(`zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw`), 11],
  ].forEach(([input, expected]) => {partOne(input, report, expected)})

  partOne(input, report, NOPE)
  // partTwo(input, report, NOPE)
}
