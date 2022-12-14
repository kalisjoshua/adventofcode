const NOPE = Symbol('NOPE')
const cleanRawInput = (raw) => raw
  .trim()
  .split(/\n\n+/)
  .map((pairs) => pairs.split(/\n/).map(JSON.parse))
const hasValue = (q) => q != null
const isArray = (q) => ({}).toString.call(q) === '[object Array]'

function compare (a, b) {
  if (hasValue(a) && !hasValue(b)) {

    return false // right side runs out first
  } else if (!hasValue(a) && hasValue(b)) {

    return true // left side runs out first
  } else if (!isArray(a) && !isArray(b)) {

    return a === b ? null : a < b
  }

  a = !isArray(a) ? [a] : a
  b = !isArray(b) ? [b] : b

  for (let index = 0; index < Math.max(a.length, b.length); index++) {
    const result = compare(a[index], b[index])

    if (hasValue(result)) {

      return result
    }
  }
}

function partOne (input, report, answer) {
  const result = input
    .map(([a, b], index) => compare(a, b) && index + 1)
    .filter(Boolean)
    .reduce((a, b) => a + b)

  report('Part one', result, answer)
}

function partTwo (input, report, answer) {
  const result = input
    .reduce((acc, [a, b]) => acc.concat([a, b]), [])
    .concat([[[2]], [[6]]])
    .filter((packet) => !/^10/.test(packet.join()))
    .sort()
    .map((packet, index) => {
      const serialized = packet.join()

      return serialized === '2' || serialized === '6'
        ? index + 1
        : 1
    })
    .reduce((a, b) => a * b)

  report('Part two', result, answer)
}

module.exports = (raw, { report }) => {
  const input = cleanRawInput(raw)
  const example = cleanRawInput(`[1,1,3,1,1]
[1,1,5,1,1]

[[1],[2,3,4]]
[[1],4]

[9]
[[8,7,6]]

[[4,4],4,4]
[[4,4],4,4,4]

[7,7,7,7]
[7,7,7]

[]
[3]

[[[]]]
[[]]

[1,[2,[3,[4,[5,6,7]]]],8,9]
[1,[2,[3,[4,[5,6,0]]]],8,9]`)

  partOne(input, report, 4809)
  partTwo(input, report, 22600)
}
