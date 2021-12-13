const example = `
fs-end
he-DX
fs-he
start-DX
pj-DX
end-zg
zg-sl
zg-pj
pj-he
RW-he
fs-DX
pj-RW
zg-RW
start-pj
he-WI
zg-he
pj-fs
start-RW
`

const countPaths = (input, filterFn) => treeWalk(input, filterFn).length
const hasDuplicates = (list) => list
  .some((step, i, orig) => orig.filter((s) => step === s).length > 1)

function toTree (acc, [a, b]) {
  if (!acc[a]) {
    acc[a] = []
  }

  if (!acc[b]) {
    acc[b] = []
  }

  acc[a].push(b)
  acc[b].push(a)

  return acc
}

function treeWalk (tree, filterFn, path = ["start"]) {
  const [head, ...tail] = path

  if (head === "end") {
    return [head, ...tail]
      .reverse()
      .join(",")
  }

  return tree[head]
    .filter((next) => filterFn(path, next))
    .flatMap((next) => treeWalk(tree, filterFn, [next, head, ...tail]))
}

module.exports = (input, {report}) => {
  input = input
    .trim()
    .split(/\n/)
    .map((line) => line.split("-"))
    .reduce(toTree, {})

  const partOne = (path, next) =>
    !path.includes(next) || next.toUpperCase() === next

  const partTwo = (path, next) =>
    !path.includes(next) || next.toUpperCase() === next || !hasDuplicates(path)

  report('Part one', countPaths(input, partOne), 4338)
  report('Part two', countPaths(input, partTwo))
}
