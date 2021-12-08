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

  const digitsOnly = input
    .map((line) => line.pop())
  const notesOnly = input
    .map(([notes]) => notes)

  // const crossedWires = {
  //   a: "d", //  aaaa    ==>    dddd
  //   b: "e", // b    c   ==>   e    a
  //   c: "a", // b    c   ==>   e    a
  //   d: "f", //  dddd    ==>    ffff
  //   e: "g", // e    f   ==>   g    b
  //   f: "b", // e    f   ==>   g    b
  //   g: "c", //  gggg    ==>    cccc
  // }
  const key = [
    /^[cagedb]+$/,  // 0
    /^[ab]+$/,      // 1
    /^[gcdfa]+$/,   // 2
    /^[fbcad]+$/,   // 3
    /^[eafb]+$/,    // 4
    /^[cdfbe]+$/,   // 5
    /^[cdfgeb]+$/,  // 6
    /^[dab]+$/,     // 7
    /^[acedgfb]+$/, // 8
    /^[cefabd]+$/,  // 9
  ]
  // digits:   0 1 2 3 4 5 6 7 8 9
  // segments: 6 2 5 5 4 5 6 3 7 6
  // unique:   _ ! _ _ ! _ _ ! ! _
  const uniques = [2, 3, 4, 7]

  const translate = (str) => [].map.call(str, (letter) => crossedWires[letter])
    .join("")

  const partOne = digitsOnly
    .map((digits) => digits.filter((str) => uniques.includes(str.length)).length)
    .reduce((a, b) => a + b)

  // const partTwo = digitsOnly
  //   .map((quad) => quad
  //     .map((str) => key
  //       .reduce((found, pattern, index) => found || pattern
  //         .exec(translate(str)) && index, false)))

  report('Part one', partOne, 274)
  // report('Part two', partTwo)
}
