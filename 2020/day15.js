const cleanInput = (input) => input
  .trim()
  .split(',')
  .map(Number)
  .reverse()

function main (input, libs) {
  input = cleanInput(input)

  main.libs = libs

  partOne(input, (...args) => libs.report('Part one', ...args))
  partTwo(input, (...args) => libs.report('Part two', ...args))
}

function partOne (input, report) {
  function process (limit, stack) {
    if (stack.length === limit) {
      return stack
    }

    const last = stack.slice(1).indexOf(stack[0]) + 1

    stack.unshift(last)

    return process(limit, stack)
  }

  const [result] = process(2020, input)

  report(result, 203)
}

function partTwo (input, report) {
  // function process (limit, stack) {
  //   const memo = {}
  //
  //   // stack.forEach((num, index) => {memo[num] = index})
  //   // console.log(JSON.stringify(memo))
  //
  //   while (stack.length < limit) {
  //     const next = memo[stack[0]] === undefined
  //       // ? 0
  //       ? stack.slice(1).indexOf(stack[0]) + 1
  //       : memo[stack[0]]
  //
  //     memo[next] = stack.length - next
  //
  //     console.log(stack[0], memo[stack[0]], next, stack.join(), JSON.stringify(memo))
  //     stack.unshift(next)
  //     // stack.push(Symbol('garbage'))
  //   }
  //
  //   return stack
  // }
  //
  // const test = (l, s, x, r = process(l, cleanInput(s))) => console.log(r[0] === x || r)
  // test(10, '0,3,6', 436) // 4,0,1,3,3,0,6,3,0
  // // test(2020, '0,3,6', 436)
  // // test(2020, '1,3,2', 1)
  // // test(2020, '2,1,3', 10)
  // // test(2020, '1,2,3', 27)
  // // test(2020, '2,3,1', 78)
  // // test(2020, '3,1,2', 1836)
  //
  // // test(30000000, '0,3,6', 175594)
  // // test(30000000, '1,3,2', 1)
  // // test(30000000, '2,1,3', 10)
  // // test(30000000, '1,2,3', 27)
  // // test(30000000, '2,3,1', 78)
  // // test(30000000, '3,1,2', 1836)
  //
  // // const [result] = process(30000000, input)
  // const [result] = process(3, input)
  //
  // report(result)
  const stack = (function () {
    return (limit, list) => {
      let counter = list.length
      const memo = new Map()
      let next = 0

      list.forEach((num, index) => memo.set(num, index))
      list.push(next)

      do {
        
        counter += 1
      } while (counter < limit)
    }
  }())

  // 0
  // {0: 0}
  // 0,3
  // {0:0, 3:1}
  // 0,3,6
  // {0:0, 3:1, 6:2}
  // 0,3,6,0
  stack(10, cleanInput('0,3,6').reverse())
}

module.exports = main
