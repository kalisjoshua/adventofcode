const chunk = ([a, b, ...rest]) => [[a, b], ...(rest.length ? chunk(rest) : [])]
const cleanInput = (input) => input
  .trim()
  .split(/\n+(?:your|nearby) ticket[s]?:\n+/g)
  .map((str) => str.split(/\n/))
  .reduce((data, item, index, all) => {
    // only for the first element in the collection
    if (!data) {
      return item
        .reduce((rules, line) => {
          const [label, ...validation] = line
            .match(/^([^:]+):\s+(\d+)-(\d+)\s+or\s+(\d+)-(\d+)$/)
            .slice(1)

          rules.rules[label] = chunk(validation.map(Number))
            // convert each pair into a function testing the number to within the range
            .map(([a, b]) => (q) => q >= a && q <= b)
            // collapse all functions into a single call chain
            .reduce((a, b) => (q) => a(q) || b(q))
          // rules.rules[label].debug = validation.join()

          return rules
        }, {rules: {}, tickets: []})
    }

    // for all remaining elements in the collection
    data.tickets = data.tickets.concat(item)

    // once all elements have been processed add a little bit more
    if (index === all.length - 1) {
      data.tickets = data.tickets
        .map((str) => str.split(',').map(Number))

      data.isValid = Reflect.ownKeys(data.rules)
        // get the validation function only
        .map((prop) => data.rules[prop])
        // collapse all functions into a single call chain
        .reduce((a, b) => (q) => a(q) || b(q))
    }

    return data
  }, null)

function main (input, libs) {
  input = cleanInput(input)

  main.libs = libs

  partOne(input, (...args) => libs.report('Part one', ...args))
  partTwo(input, (...args) => libs.report('Part two', ...args))
}

function partOne (input, report) {
  const {isValid, tickets} = input

  const result = tickets
    .slice(1)
    .flatMap((ticket) => ticket.filter((t) => !isValid(t)))
    .reduce((a, b) => a + b)

  report(result, 25788)
}

function partTwo (input, report) {
//   input = cleanInput(`class: 0-1 or 4-19
// row: 0-5 or 8-19
// seat: 0-13 or 16-19
//
// your ticket:
// 11,12,13
//
// nearby tickets:
// 3,9,18
// 15,1,5
// 5,14,9`)
  const {isValid, rules, tickets} = input
  const fields = Reflect.ownKeys(rules)
  // console.log(rules)

  const validTickets = tickets
    .filter((ticket) => ticket.every(isValid))

  const fieldOptions = validTickets
    .map((row) => row
      .map((column) => fields.filter((field) => rules[field](column))))

  validTickets
    .forEach((row) => {
      const validation = row
        .map((col) => fields.filter((field) => rules[field](col)))
      // console.log(validation)
    }, [])
  // const temp = fields
  //   .map((x, column) => {
  //     return fields
  //       .filter((field) => fieldOptions.every((ticket) => ticket[column].includes(field)))
  //   })
  // const columns = fields
  //   .reduce((ordered, field, column) => {
  //     fieldOptions
  //       .map((ticket) => ticket[column])
  //   }, [])

  report()
}

module.exports = main
