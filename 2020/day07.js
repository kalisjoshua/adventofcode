const MY_BAG = 'shiny gold'

function main (input, libs) {
  input = input
    .trim()
    .split(/\n/)
    .reduce(parseInput, {})

  function parseInput (acc, line) {
    const rLine = /(.*?) bags contain ([^.]+)/
    const rRule = /^(?:no other)|(\d+)\s+(.*)$/

    const [bag, contents] = line.match(rLine).slice(1)
    const parseRegulation = (rule) => {
      const [value, key] = rule.match(rRule).slice(1)

      return key && value ? {[key]: value} : {}
    }

    acc[bag] = contents
      .replace(/ bag(?:s)?/g, '')
      .split(/\s*,\s*/)
      .reduce((rules, rule) => ({...rules, ...parseRegulation(rule)}), {})

    return acc
  }

  main.libs = libs

  partOne(input, (...args) => libs.report('Part one', ...args))
  partTwo(input, (...args) => libs.report('Part two', ...args))
}

function partOne (input, report) {
  function findContainingBags (all, search) {
    const bags = Reflect.ownKeys(all)
    const containers = new Set(bags
      .filter((bag) => all[bag][search])
      .flatMap((bag) => [bag, ...findContainingBags(all, bag)]))

    return containers
  }

  const result = findContainingBags(input, MY_BAG).size

  report(result, 272)
}

function partTwo (input, report) {
  function findContainedBags (all, search) {
    const bags = Reflect.ownKeys(all[search])

    if (!bags.length) {
      return 0
    }

    return bags
      .map((bag) => all[search][bag] * (1 + findContainedBags(all, bag) || 1))
      .reduce((a, b) => a + b)
  }

  const result = findContainedBags(input, MY_BAG)

  report(result, 172246)
}

module.exports = main
