const example = `
NNCB

CH -> B
HH -> N
CB -> H
NH -> C
HB -> C
HC -> B
HN -> C
NN -> C
BH -> H
NC -> B
NB -> B
BN -> B
BB -> N
BC -> B
CC -> N
CN -> C
`

function betterSolution (template, rules, steps) {
  let result = template

  while (steps--) {
    result = result
      .split("")
      .reduce((acc, char) => acc + rules[[].slice.call(acc, -1)[0] + char] + char)
  }

  return result
}

function countElements (polymer) {
  const elementCounts = polymer
    .split("")
    .reduce((acc, letter) => ({...acc, [letter]: (acc[letter] || 0) + 1}), {})
  const sortedElements = Object.entries(elementCounts)
    .sort((a, b) => a[1] - b[1])

  return [
    sortedElements.pop()[1],
    sortedElements.shift()[1],
  ].reduce((a, b) => a - b)
}

function naiveSolution (template, rules, steps) {
  const getPairs = (template) => template
    .split("")
    .reduce((acc, letter, index) => acc.concat(letter + (template[index + 1] || "")), [])
    .filter((pair) => pair.length === 2)

  function makePolymer (template, rules, iteration = 10) {
    if (!iteration) return template

    const first = template.split("")
    const last = first.pop()

    const newTemplate = getPairs(template)
      .map((pair, index) => first[index] + rules[pair])
      .join("") + last

    return makePolymer(newTemplate, rules, iteration - 1)
  }

  return countElements(makePolymer(template, rules, steps))
}

function parseRules (acc, rule) {
  if (!rule) return [acc, {}]

  const [key, val] = rule.split(/ -> /)

  acc[1][key] = val

  return acc
}

module.exports = (input, {report}) => {
  const [template, rules] = input
    .trim()
    .split(/\n/)
    .reduce(parseRules)

  const partOne = betterSolution(template, rules, 10)

  // const partTwo = betterSolution(template, rules, 15)

  report('Part one', partOne, 2587)
  // report('Part two', partTwo)
}
