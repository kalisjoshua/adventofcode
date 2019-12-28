const pipeline = (...args) => args.reduce((acc, fn) => fn(acc))

module.exports = pipeline
