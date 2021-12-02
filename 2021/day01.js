const reducerFn = (acc, num, index, input) =>
  acc + Number(index > 0 && input[index - 1] < input[index])

module.exports = (input, {report}) => {
  input = input
    .match(/\d+/g)
    .map((str) => parseInt(str, 10))

  const partOne = input
    .reduce(reducerFn, 0)

  const partTwo = input
    .map((num, index) => num + input[index + 1] + input[index + 2])
    .slice(0, -2) // not necessary really but safer to include "just in case"
    .reduce(reducerFn, 0)

  report('Part one', partOne, 1298)
  report('Part two', partTwo, 1248)
}
