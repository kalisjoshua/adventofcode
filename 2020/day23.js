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
  let circle = input.slice(0)

  const current = circle[0]
  const three = circle.slice(1, 4)
  const remaining = circle.slice(4)
  const destination = remaining
    .filter((cup) => cup < current)
    .sort((a, b) => a - b)
    .pop() || Math.max(...remaining)
  // circle = [current]
  //   .concat(remaining.splice(remaining.indexOf(destination), 0, ...three))
  console.log(remaining)
  remaining
    .splice(1 + remaining.indexOf(destination), 0, ...three)
  console.log(remaining)
  console.log(destination)
  console.log(remaining.indexOf(destination))
  console.log(three)

  report()
}

function partTwo (input, report) {
  // const result = input

  report()
}

module.exports = main
