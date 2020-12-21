const cleanInput = (input) => input
  .trim()
  .replace(/"/g, '')
  .split(/\n/)
  .reduce((acc, line) => {
    if (/^\d/.test(line)) {
      const [index, rule] = line.split(': ')

      acc.rules[index] = rule
    } else if (line) {
      acc.messages.push(line)
    }

    return acc
  }, {messages: [], rules: {}})

function main (input, libs) {
  input = cleanInput(input)

  main.libs = libs

  partOne(input, (...args) => libs.report('Part one', ...args))
  partTwo(input, (...args) => libs.report('Part two', ...args))
}

function partOne (input, report) {
  const result = simpleSolution(input)

  report(result, 224)
}

function partTwo (input, report) {
  /*
  input = cleanInput(`42: 9 14 | 10 1
9: 14 27 | 1 26
10: 23 14 | 28 1
1: "a"
11: 42 31
5: 1 14 | 15 1
19: 14 1 | 14 14
12: 24 14 | 19 1
16: 15 1 | 14 14
31: 14 17 | 1 13
6: 14 14 | 1 14
2: 1 24 | 14 4
0: 8 11
13: 14 3 | 1 12
15: 1 | 14
17: 14 2 | 1 7
23: 25 1 | 22 14
28: 16 1
4: 1 1
20: 14 14 | 1 15
3: 5 14 | 16 1
27: 1 6 | 14 18
14: "b"
21: 14 1 | 1 14
25: 1 1 | 1 14
22: 14 14
8: 42
26: 14 22 | 1 20
18: 15 15
7: 14 5 | 1 21
24: 14 1

abbbbbabbbaaaababbaabbbbabababbbabbbbbbabaaaa
bbabbbbaabaabba
babbbbaabbbbbabbbbbbaabaaabaaa
aaabbbbbbaaaabaababaabababbabaaabbababababaaa
bbbbbbbaaaabbbbaaabbabaaa
bbbababbbbaaaaaaaabbababaaababaabab
ababaaaaaabaaab
ababaaaaabbbaba
baabbaaaabbaaaababbaababb
abbbbabbbbaaaababbbbbbaaaababb
aaaaabbaabaaaaababaa
aaaabbaaaabbaaa
aaaabbaabbaaaaaaabbbabbbaaabbaabaaa
babaaabbbaaabaababbaabababaaab
aabbbbbaabbbaaaaaabbbbbababaaaaabbaaabba`)

  input.rules[8] = '42 | 42 8'
  input.rules[11] = '42 31 | 42 11 31'
  */
//   input = cleanInput(`0: 4 1 5
// 1: 2 3 | 3 2
// 2: 4 4 | 5 5
// 3: 4 5 | 5 4
// 4: "a"
// 5: "b"
//
// ababbb
// bababa
// abbbab
// aaabbb
// aaaabbb`)
  input = cleanInput(`0: 1 2
1: a
2: b

ab
bb
aa
ba`)

  function parser (heap, str, pointer = 0) {
    let isValid = false
    const stack = heap[pointer]
      .split('|')
      .map((s) => s.trim().split(' '))

    while (stack.length && !isValid) {
      const rule = stack.shift()
      // console.log(rule)

      // isValid = rule
      //   .every((r, i) => (
      //     /^\D$/.test(r)
      //       ? str.startsWith(r)
      //       : parser(heap, str, i)
      //   ))

      // if (/^\D$/.test(rule)) {
      //   isValid = str.startsWith(rule)
      // }
    }

    return isValid
  }

  // console.log(input.rules)

  const result = input.messages
    .filter((line) => parser(input.rules, line))

  // console.log(result)

  report()
}

function simpleSolution (input) {
  const {messages, rules} = input

  let expanded = rules[0]

  do {
    expanded = expanded
      .replace(/\d+/, (m) => (/\|/.test(rules[m]) ? `(?:${rules[m]})` : rules[m]))
  } while (/\d/.test(expanded))

  const pattern = expanded
    .replace(/\s+/g, '')

  expanded = RegExp(`^${pattern}$`)

  return messages
    .filter((line) => expanded.test(line))
    .length
}

module.exports = main
