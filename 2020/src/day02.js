const input = process.argv[2]
  .split(/\n/)
  .map(parse)

function parse (str) {
  const [min, max, letter, password] = str
    .match(/^(\d+)-(\d+)\s+(.):\s+(\w+)$/)
    .slice(1)

  return {min, max, letter, password}
}

const partOneAnswer = 550
const partOneResult = input
  .filter(({min, max, letter, password}) => {
    const count = (password
      .match(RegExp(letter, 'g')) || [])
      .length

    return count >= min && count <= max
  })
  .length

if (partOneAnswer !== partOneResult) {
  console.log('Part one not complete:', partOneResult, 'does not equal', partOneAnswer)
} else {
  console.log('Part one completed successfully.')
}

// *****************************************************************************

const partTwoAnswer = 634
const partTwoResult = input
  .filter(({min, max, letter, password}) => {
    const first = password[min - 1] === letter
    const second = password[max - 1] === letter

    return (first || second) && !(first && second)
  })
  .length

if (partTwoAnswer !== partTwoResult) {
  console.log('Part two not complete:', partTwoResult, 'does not equal', partTwoAnswer)
} else {
  console.log('Part two completed successfully.')
}
