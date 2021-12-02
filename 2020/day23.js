const cleanInput = (input) => input
  .trim()
  .split('')
  .map(Number)

function main (input, libs) {
  input = cleanInput(input)

  main.libs = libs

  partOne(input, (...args) => libs.report('Part one', ...args))
  partTwo(input, (...args) => libs.report('Part two', ...args))
}

function partOne (input, report) {
  input = cleanInput('389125467')
  let cups = input.slice(0)

  function rotate (circle, index) {
    const len = circle.length
    const selected = index % len
    const selectedPlusThree = (selected + 3) % len
    const current = circle[selected]
    const three = circle.slice((selected + 1) % len, selectedPlusThree)
    const remaining = circle.slice(selectedPlusThree)
    const destination = remaining
      .filter((cup) => cup < current)
      .sort((a, b) => a - b)
      .pop() || Math.max(...remaining)
    // console.log(`-- move ${index + 1} --`)
    // console.log(`cups: ${circle.join(' ')}`)
    // console.log(`pick ups: ${three.join(' ')}`)
    // console.log(`destination: ${destination}`)
    // console.log('')
    remaining
      .splice(1 + remaining.indexOf(destination), 0, ...three)
    remaining
      .unshift(current)
    // console.log(remaining.join(' '))

    return remaining.slice(0)
  }

  let counter = 0

  while (counter < 10) {
    console.log(cups.join(' '))
    cups = rotate(cups, counter)
    counter += 1
  }

  const result = cups.join('')

  report(result)
}

function partTwo (input, report) {
  // const result = input

  report()
}

module.exports = main
