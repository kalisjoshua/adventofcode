const parseInputLines = ([current, ...rest], line) => (
  line.trim()
    ? [`${current} ${line}`.trim(), ...rest]
    : ['', current, ...rest]
)
const parseProperties = (line) => line
  .match(/...:[^\s]+/g)
  .map((str) => str.split(':'))
  .reduce((acc, [key, val]) => ({...acc, [key]: val}), {})

const required = [
  'byr',
  'iyr',
  'eyr',
  'hgt',
  'hcl',
  'ecl',
  'pid',
  // 'cid',
]

function main (input, {report}) {
  input = input
    .trim()
    .split(/\n/)
    .reduce(parseInputLines, [''])
    .reverse()
    .map(parseProperties)

  partOne(input, (...args) => report('Part one', ...args))
  partTwo(input, (...args) => report('Part two', ...args))
}

function partOne (input, report) {
  const result = input
    .filter((passport) => {
      const keys = Reflect.ownKeys(passport)

      return required.every((prop) => keys.includes(prop))
    })
    .length

  report(result, 190)
}

function partTwo (input, report) {
  const result = input
    .filter(({byr, iyr, eyr, hgt, hcl, ecl, pid}) => (
      // byr (Birth Year) - four digits; at least 1920 and at most 2002.
      // eslint-disable-next-line indent
         byr >= 1920 && byr <= 2002
      // iyr (Issue Year) - four digits; at least 2010 and at most 2020.
      && iyr >= 2010 && iyr <= 2020
      // eyr (Expiration Year) - four digits; at least 2020 and at most 2030.
      && eyr >= 2020 && eyr <= 2030
      // hgt (Height) - a number followed by either cm or in:
      //
      //     If cm, the number must be at least 150 and at most 193.
      //     If in, the number must be at least 59 and at most 76.
      //
      && validateHeight(hgt)
      // hcl (Hair Color) - a # followed by exactly six characters 0-9 or a-f.
      && /^#[\da-f]{6}$/.test(hcl)
      // ecl (Eye Color) - exactly one of: amb blu brn gry grn hzl oth.
      && /^(?:amb|blu|brn|gry|grn|hzl|oth)$/.test(ecl)
      // pid (Passport ID) - a nine-digit number, including leading zeroes.
      && /^\d{9}$/.test(pid)
    ))
    .length

  report(result, 121)
}

function validateHeight (hgt) {
  const [height, system] = (/^(\d+)(cm|in)$/
    .exec(hgt) || [])
    .slice(1)

  switch (system) {
    case 'cm': return height >= 150 && height <= 193
    case 'in': return height >= 59 && height <= 76
    default: return false
  }
}

module.exports = main
