const NOPE = Symbol('NOPE')

const regex = /^((?:\$\s+cd)|(?:dir)|(?:\d+))\s+(.*)?$/
const TOTAL_DISK_SPACE = 70000000
const UPDATE_REQUIRED_SPACE = 30000000

const cleanRawInput = (raw) => raw
  .trim()
  .split(/\n/)
  .filter((line) => line !== '$ ls') // skip over `ls` commands
  .filter((line) => !/^dir/.test(line)) // skip over `dir` lines
  .slice(1)
  .reduce(readLog, {cwd: [''], fs: [], sizes: {}})
const joinPath = (ar) => ar.join('/') || '/'

function partOne(input, report, answer) {
  const result = Object.entries(input.sizes)
    .reduce((acc, [path, size]) => {
      if (size <= 100000) {
        acc += size
      }

      return acc
    }, 0)

  report('Part one', result, answer)
}

function partTwo(input, report, answer) {
  const AVAILABLE_SPACE = TOTAL_DISK_SPACE - input.sizes['/']
  const NEEDED_SPACE = UPDATE_REQUIRED_SPACE - AVAILABLE_SPACE

  const result = Object.entries(input.sizes)
    .filter(([_, size]) => size >= NEEDED_SPACE)
    .sort((a, b) => a[1] - b[1])
    [0]

  report('Part one', result, answer)
}

function readLog (state, line) {
  const [a, b] = line.match(regex).slice(1)

  switch (a) {
    case '$ cd':
      if (b === '..') {
        state.cwd.pop()
      } else {
        state.cwd.push(b)
      }

      break
    default:
      const size = parseInt(a, 10)
      let parents = state.cwd.slice(0)

      do {
        const path = joinPath(parents)

        state.sizes[path] = (state.sizes[path] || 0) + size

        parents.pop()
      } while (parents.length)

      break
  }

  return state
}

module.exports = (raw, { report }) => {
  const input = cleanRawInput(raw)
  const example = cleanRawInput(`$ cd /
$ ls
dir a
14848514 b.txt
8504156 c.dat
dir d
$ cd a
$ ls
dir e
29116 f
2557 g
62596 h.lst
$ cd e
$ ls
584 i
$ cd ..
$ cd ..
$ cd d
$ ls
4060174 j
8033020 d.log
5626152 d.ext
7214296 k`)

  partOne(input, report, 1490523)
  partTwo(input, report, 12390492)
}
