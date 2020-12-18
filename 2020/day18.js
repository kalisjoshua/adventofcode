const cleanInput = (input) => input
  .trim()
  .split(/\n/)
  .map((s) => s.replace(/\s+/g, ''))

function main (input, libs) {
  input = cleanInput(input)

  main.libs = libs

  partOne(input, (...args) => libs.report('Part one', ...args))
  partTwo(input, (...args) => libs.report('Part two', ...args))
}

function partOne (input, report) {
  function parse (str) {
    let eq = str
    const peek = (r) => (r.exec(eq) || []).slice(1)

    if (!/[()]/.test(eq)) {
      do {
        const [left, symbol, right, rest] = peek(/^(\d+)([*+])(\d+)(.*)$/)

        eq = `${{
          '*': (a, b) => a * b,
          '+': (a, b) => a + b,
        }[symbol](parseInt(left, 10), parseInt(right, 10))}${rest}`
      } while (!/^\d+$/.test(eq))

      return parseInt(eq, 10)
    }

    const rParens = /(?:\(([^())]+)\))/

    while (rParens.test(eq)) {
      eq = eq.replace(rParens, parse(...peek(rParens)))
    }

    return parseInt(parse(eq), 10)
  }

  const result = input
    .reduce((sum, eq) => sum + parse(eq), 0)

  report(result, 98621258158412)
}

function partTwo (input, report) {
  function parse (str) {
    let eq = str
    const peek = (r) => (r.exec(eq) || []).slice(1)

    if (!/[()]/.test(eq)) {
      const rAdd = /\d+\+\d+/

      while (rAdd.test(eq)) {
        // eslint-disable-next-line no-eval
        eq = eq.replace(rAdd, eval)
      }

      const rMultiply = /\d+\*\d+/

      while (rMultiply.test(eq)) {
        // eslint-disable-next-line no-eval
        eq = eq.replace(rMultiply, eval)
      }

      return parseInt(eq, 10)
    }

    const rParens = /(?:\(([^())]+)\))/

    while (rParens.test(eq)) {
      eq = eq.replace(rParens, parse(...peek(rParens)))
    }

    return parseInt(parse(eq), 10)
  }

  const result = input
    .reduce((sum, eq) => sum + parse(eq), 0)

  report(result, 241216538527890)
}

module.exports = main
