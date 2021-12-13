const example = `
be cfbegad cbdgef fgaecd cgeb fdcge agebfd fecdb fabcd edb | fdgacbe cefdb cefbgd gcbe
edbfga begcd cbg gc gcadebf fbgde acbgfd abcde gfcbed gfec | fcgedb cgb dgebacf gc
fgaebd cg bdaec gdafb agbcfd gdcbef bgcad gfac gcb cdgabef | cg cg fdcagb cbg
fbegcd cbd adcefb dageb afcb bc aefdc ecdab fgdeca fcdbega | efabcd cedba gadfec cb
aecbfdg fbg gf bafeg dbefa fcge gcbea fcaegb dgceab fcbdga | gecf egdcabf bgf bfgea
fgeab ca afcebg bdacfeg cfaedg gcfdb baec bfadeg bafgc acf | gebdcfa ecba ca fadegcb
dbcfg fgd bdegcaf fgec aegbdf ecdfab fbedc dacgb gdcebf gf | cefg dcbef fcge gbcadfe
bdfegc cbegaf gecbf dfcage bdacg ed bedf ced adcbefg gebcd | ed bcgafe cdgba cbgef
egadfb cdbfeg cegd fecab cgb gbdefca cg fgcdab egfdb bfceg | gbdfcae bgc cg cgb
gcafb gcf dcaebfg ecagb gf abcdeg gaef cafbge fdbac fegbdc | fgae cfgab fg bagce
`

module.exports = (input, {report}) => {
  input = example
    .trim()
    .split(/\n/)
    .map((line) => line.split(/\s*\|\s*/).map((str) => str.match(/[abcdefg]+/g)))

  const uniques = [2, 3, 4, 7]
  const isUnique = (str) => uniques.includes(str.length)

  const partOne = input
    .map(([_, digits]) => digits.filter(isUnique).length)
    .reduce((a, b) => a + b)

  // const partTwo = digitsOnly

  report('Part one', partOne, 274)
  // report('Part two', partTwo)
}

//   0:      1:      2:      3:      4:
//  aaaa    ....    aaaa    aaaa    ....
// b    c  .    c  .    c  .    c  b    c
// b    c  .    c  .    c  .    c  b    c
//  ....    ....    dddd    dddd    dddd
// e    f  .    f  e    .  .    f  .    f
// e    f  .    f  e    .  .    f  .    f
//  gggg    ....    gggg    gggg    ....
//
//   5:      6:      7:      8:      9:
//  aaaa    aaaa    aaaa    aaaa    aaaa
// b    .  b    .  .    c  b    c  b    c
// b    .  b    .  .    c  b    c  b    c
//  dddd    dddd    ....    dddd    dddd
// .    f  e    f  .    f  e    f  .    f
// .    f  e    f  .    f  e    f  .    f
//  gggg    gggg    ....    gggg    gggg

// number | segments | lights  | unique
//    0   |     6    | 1110111 |
//    1   |     2    | 0010010 | Y
//    2   |     5    | 1011101 |
//    3   |     5    | 1011011 |
//    4   |     4    | 0111010 | Y
//    5   |     5    | 1101011 |
//    6   |     6    | 1101111 |
//    7   |     3    | 1010010 | Y
//    8   |     7    | 1111111 | Y
//    9   |     6    | 1111011 |
