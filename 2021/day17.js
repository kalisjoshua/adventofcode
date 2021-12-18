//  20,  30,  -10,  -5
// 143, 177, -106, -71
const example = "target area: x=20..30, y=-10..-5"

const sumOfIntegers = (start) => start * (1 + start) / 2

function findMaxHeight (input) {
  // const mapAscending =
  const reduceInRange = (acc, [num, sumInts]) =>
    sumInts >= input[0] && sumInts <= input[1]
      ? [...acc, num]
      : acc

  return Array
    .from(Array(Math.floor(input[0])), (_, i) => [i, sumOfIntegers(i)])
    .reduce(reduceInRange, [])
    // I do NOT know why (initial Y velocity) this - Math.abs(input[2]) - 1) - works
    .map((x) => simulate(input, x, Math.abs(input[2]) - 1))
    .sort((a, b) => a.maxHeight - b.maxHeight)
    .pop()

  // return Array
  //   .from(Array(Math.floor(input[0])), (_, i) => [i, sumOfIntegers(i)])
  //   .reduce(reduceInRange, [])
  //   .map((velocityX) => {
  //     let velocityY = 1
  //     const results = []
  //
  //     do {
  //       results.unshift(simulate(input, velocityX, velocityY++))
  //     } while (results[0].maxHeight)
  //
  //     // results.shift()
  //
  //     return results
  //   })
  //   .flat()
  //   .sort((a, b) => a.maxHeight - b.maxHeight)
  //   .pop()
}

function simulate ([rangeXmin, rangeXmax, rangeYmin, rangeYmax], velocityX, velocityY) {
  const initialVelocity = [velocityX, velocityY]
  let failed = false
  let height = 0
  let success = false
  let x = 0
  let y = 0

  while (!failed && !success) {
    // 1. The probe's x position increases by its x velocity.
    x += velocityX
    // 2. The probe's y position increases by its y velocity.
    y += velocityY
    // 3. Due to drag, the probe's x velocity changes by 1 toward the value 0; that is,
    //    it decreases by 1 if it is greater than 0,
    //    increases by 1 if it is less than 0,
    //    or does not change if it is already 0.
    velocityX += velocityX > 0 ? -1 : velocityX < 0 ? 1 : 0
    // 4. Due to gravity, the probe's y velocity decreases by 1.
    velocityY -= 1

    height = height < y ? y : height
    success = rangeXmin <= x && rangeXmax >= x && rangeYmin <= y && rangeYmax >= y

    failed = x > rangeXmax || y < rangeYmin
    // console.log({x, y, velocityX, velocityY})
  }

  return {
    initialVelocity,
    maxHeight: success ? height : 0,
    position: [x, y],
    success,
    underOrOver: x < rangeXmin ? -1 : x > rangeXmax ? 1 : 0,
  }
}

module.exports = (input, {report}) => {
  input = input
    .trim()
    .match(/-?\d+/g)

  const partOne = findMaxHeight(input)
  // console.log(JSON.stringify(partOne, null, 4))
  // my guess and check - totally luck based - solution
  // console.log(JSON.stringify(simulate(input, 17, 105), null, 4))
  // console.log(JSON.stringify(simulate(input, 18, 105), null, 4))

  const partTwo = input

  // 1326 is too low
  report('Part one', partOne.maxHeight, 5565)
  // report('Part two', partTwo)
}
