const NOPE = Symbol('NOPE')
const cleanRawInput = (raw) => raw
  .trim()
  .split(/\n/)
  .map((line) => line.split(''))
const example = `
30373
25512
65332
33549
35390`
const range = (len, fill) => Array(len).fill(0).map(fill)

function partOne(input, report, answer) {
  let others = 0
  const MAX = input.length - 1

  for (let x = 1; x < MAX; x++) {
    for (let y = 1; y < MAX; y++) {
      const current = input[x][y]
      const allLessThan = (q) => q < current

      const tallest = [
        // left
        range(y, (_, i) => input[x][i]),
        // right
        range(MAX - y, (_, i) => input[x][i + y + 1]),
        // up
        range(x, (_, i) => input[i][y]),
        // down
        range(MAX - x, (_, i) => input[i + x + 1][y]),
      ]
        .map((list) => list.every(allLessThan))
        .reduce((acc, r) => acc || r)

      if (tallest) {
        others++
      }
    }
  }

  const result = MAX * 4 + others

  report('Part one', result, answer)
}

function partTwo(input, report, answer) {
  let result = 0
  const MAX = input.length - 1

  for (let x = 1; x < MAX; x++) {
    for (let y = 1; y < MAX; y++) {
      const current = input[x][y]
      const findBlock = ([blocked, trees], tree) => {
        if (!blocked) {
          blocked = tree >= current
          trees.push(tree)
        }

        return [blocked, trees]
      }

      const scenic = [
        // up
        range(x, (_, i) => input[i][y]).reverse(),
        // left
        range(y, (_, i) => input[x][i]).reverse(),
        // right
        range(MAX - y, (_, i) => input[x][i + y + 1]),
        // down
        range(MAX - x, (_, i) => input[i + x + 1][y]),
      ]
        .map((list) => list.reduce(findBlock, [false, []]).pop())
        .reduce((acc, list) => acc * list.length, 1)

      if (scenic > result) {
        result = scenic
      }
    }
  }

  report('Part two', result, answer)
}

module.exports = (raw, { report }) => {
  const input = cleanRawInput(raw)
  const ex = cleanRawInput(example)

  partOne(input, report, 1812)
  partTwo(input, report, 315495)
}
