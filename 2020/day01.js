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
    .reduce((acc, first, fIndex, fList) => {
      if (acc) {
        return acc
      } else {
        return fList.slice(fIndex + 1)
          .reduce((acc, second, sIndex, sList) => {
            if (acc) {
              return acc
            } else {
              return sList.slice(sIndex + 1)
                .reduce((acc, third) => 2020 === (first + second + third)
                  ? [first, second, third]
                  : acc, false)
            }
          }, false)
      }
    }, false)
    .reduce((a, b) => a * b)

  report(result, 51810360)
}

module.exports = main
