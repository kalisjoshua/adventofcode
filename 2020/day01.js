function main (input, {report}) {
  input = input
    .match(/\d+/g)
    .map((str) => parseInt(str, 10))

  partOne(input, (...args) => report('Part one', ...args))
  partTwo(input, (...args) => report('Part two', ...args))
}

function partOne (input, report) {
  const found = input
    .find((num, index, list) => list.includes(2020 - num, index + 1))
  const partner = 2020 - found
  const result = found * partner

  report(result, 996075)
}

function partTwo (input, report) {
  const result = input
    .reduce((acc0, first, fIndex, fList) => acc0 || fList.slice(fIndex + 1)
      .reduce((acc1, second, sIndex, sList) => acc1 || sList.slice(sIndex + 1)
        .reduce((acc2, third) => ((first + second + third) === 2020
          ? [first, second, third]
          : acc2), false), false), false)
    .reduce((a, b) => a * b)

  report(result, 51810360)
}

module.exports = main
