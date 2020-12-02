const input = process.argv[2]
  .match(/\d+/g)
  .map((str) => parseInt(str, 10))

const found = input
  .find((num, index, list) => list.includes(2020 - num, index + 1))
const partner = 2020 - found
const partOneAnswer = 996075
const partOneResult = found * partner

if (partOneAnswer !== partOneResult) {
  console.log('Part one not complete:', partOneResult, 'does not equal', partOneAnswer)
} else {
  console.log('Part one completed successfully.')
}

// // Solution 1
// input
//   .find((first, firstIndex, firstList) => {
//     return firstList.slice(firstIndex + 1)
//       .find((second, secondIndex, secondList) => {
//         return secondList.slice(secondIndex + 1)
//           .find((third) => {
//             const result = first + second + third === 2020
//
//             if (result) {
//               console.log([first, second, third], first * second * third)
//             }
//
//             return result
//           })
//       })
//   })

// Solution 2
const partTwoResult = input
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


// // Solution 3
// console.log([168, 185, 1667])
// const count = 3
// const limit = 2020
// const product = (a, b) => a * b
// const sum = (a, b) => a + b
//
// function walker ([found, acc], num, index, list) {
//   if (found) {
//
//     return [found, acc]
//   } else if (acc.length === count) {
//
//     return acc.reduce(sum) === limit
//       ? [true, acc.reduce(product)]
//       : [found, acc]
//   } else if (acc.length < count) {
//     console.log(acc)
//
//     return list.slice(index + 1)
//       .reduce(walker, [found, acc.concat(num)])
//   } else {
//
//     return list.slice(index + 1)
//       .reduce(walker, [false, []])
//   }
// }
//
// const partTwoResult = input
//   .reduce(walker, [false, []])
//
// console.log(partTwoResult)

// *****************************************************************************

const partTwoAnswer = 51810360

if (partTwoAnswer !== partTwoResult) {
  console.log('Part two not complete:', partTwoResult, 'does not equal', partTwoAnswer)
} else {
  console.log('Part two completed successfully.')
}
