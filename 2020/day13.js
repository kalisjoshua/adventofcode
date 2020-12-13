const cleanInput = (input) => input
  .trim()
  .split(/\n/)
  .reduce((acc, schedule) => [acc, ...schedule.split(',')])
  .filter(Number)
  .map(Number)

function main (input, libs) {
  input = cleanInput(input)

  main.libs = libs

  partOne(input, (...args) => libs.report('Part one', ...args))
  partTwo(input, (...args) => libs.report('Part two', ...args))
}

function partOne (input, report) {
  const [earliest, ...buses] = input
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

  report(result)
}

function partTwo (input, report) {
  // const result = input

  report()
}

module.exports = main
