const cleanRawInput = (raw) => raw
  .trim()
  .split(/\n/)

const genCharArray = (offset = 65, len = 26) => Array(len).fill(0)
  .map((_, i) => String.fromCharCode(i + offset))

function findCommon (rucksack,  size = 2) {
  const first = rucksack.slice(0, rucksack.length / size)
  const second = rucksack.slice(rucksack.length / size)

  return first
    .split('')
    .filter((char) => second.includes(char))
    .shift()
}

function partOne(input, report, answer) {
  const priority = [...genCharArray(97), ...genCharArray(65)]
  const result = input
    .reduce((acc, s) => acc + priority.indexOf(findCommon(s)) + 1, 0)

  report('Part one', result, answer)
}

function partTwo(input, report, answer) {
  const result = 1

  report('Part one', result, answer)
}

module.exports = (raw, { report }) => {
  // const input = cleanRawInput(raw)
  const input = cleanRawInput(`vJrwpWtwJgWrhcsFMMfFFhFp
jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL
PmmdzqPrVvPwwTWBwg
wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn
ttgJtRGJQctTZtZT
CrZsJsPPZsGzwwsLwLmpwMDw`)

  partOne(input, report, 7763)
  partTwo(input, report, null)
}
