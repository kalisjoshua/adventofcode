// eslint-disable-next-line no-console
const log = (...args) => console.log(...args)

Reflect.ownKeys(console)
  .forEach((key) => log[key] = (...args) => console[key](`\n[${key}]\n`, ...args))

module.exports = log
