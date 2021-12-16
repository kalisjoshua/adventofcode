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

/*******************************************************************************
*   0:      1:      2:      3:      4:      5:      6:      7:      8:      9:
*  aaaa    ....    aaaa    aaaa    ....    aaaa    aaaa    aaaa    aaaa    aaaa
* b    c  .    c  .    c  .    c  b    c  b    .  b    .  .    c  b    c  b    c
* b    c  .    c  .    c  .    c  b    c  b    .  b    .  .    c  b    c  b    c
*  ....    ....    dddd    dddd    dddd    dddd    dddd    ....    dddd    dddd
* e    f  .    f  e    .  .    f  .    f  .    f  e    f  .    f  e    f  .    f
* e    f  .    f  e    .  .    f  .    f  .    f  e    f  .    f  e    f  .    f
*  gggg    ....    gggg    gggg    ....    gggg    gggg    ....    gggg    gggg
*******************************************************************************/
const SEGMENTS = {
  "abcefg":  0, // 6
  "cf":      1, // 2 U
  "acdeg":   2, // 5
  "acdfg":   3, // 5
  "bcdf":    4, // 4 U
  "abdfg":   5, // 5
  "abdefg":  6, // 6
  "acf":     7, // 3 U
  "abcdefg": 8, // 7 U
  "abcdfg":  9, // 6
}

const unique = (note, len) => note
  .filter((str) => str.length === len)

function decodeNotes (notes) {
  const [two, three, four] = [2, 3, 4]
    .map((num) => unique(notes, num)[0].split(""))
  const mapping = {
    // from "correct" letter to "wrong" letter
    a: three.filter((digit) => !two.includes(digit))[0],
    b: four.filter((digit) => !two.includes(digit)),
    c: two.slice(0),
    d: four.filter((digit) => !two.includes(digit)),
    // e: , // handled below
    f: two.slice(0),
    g: "abcdefg"
      .split("")
      .filter((letter) => !three.concat(four).includes(letter))
      .filter((letter) => notes
        .filter((digit) => digit.length > 4)
        .every((seq) => seq.search(letter) > -1))[0]
  }

  mapping.e = Array.from(new Set(Object.values(mapping).flat()))
    .reduce((acc, letter) => acc.replace(letter, ""), "abcdefg")

  const theNumber2 = notes
    .filter((segments) => segments.length === 5 && segments.search(mapping.e) > -1)[0]
    .replace(mapping.a, "")
    .replace(mapping.e, "")
    .replace(mapping.g, "")

  mapping.d = mapping.d
    .filter((letter) => theNumber2.search(letter) > -1)[0]
  mapping.b = mapping.b
    .filter((letter) => letter !== mapping.d)[0]

  mapping.c = mapping.c
    .filter((letter) => theNumber2.search(letter) > -1)[0]
  mapping.f = mapping.f
    .filter((letter) => letter !== mapping.c)[0]

  return Object.fromEntries(Object.entries(mapping).map((pair) => pair.reverse()))
}

function segmentsToNumbers (mapping, digits) {

  return parseInt(digits
    .map((digit) => SEGMENTS[digit.split("").map((letter) => mapping[letter]).sort().join("")])
    .join(""), 10)
}

module.exports = (input, {report}) => {
  input = input
    .trim()
    .split(/\n/)
    .map((line) => line.split(/\s*\|\s*/).map((str) => str.match(/[abcdefg]+/g)))

  const uniques = [2, 3, 4, 7]
  const isUnique = (str) => uniques.includes(str.length)

  const partOne = input
    .map(([notes, digits]) => digits.filter(isUnique).length)
    .reduce((a, b) => a + b)

  const partTwo = input
    .reduce((acc, [notes, digits]) => acc + segmentsToNumbers(decodeNotes(notes), digits), 0)

  report('Part one', partOne, 274)
  report('Part two', partTwo, 1012089)
}
