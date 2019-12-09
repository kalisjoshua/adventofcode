const trace = (function () {
  let last = new Date()

  return (s) => {
    const time = ((new Date()) - last).toString().padStart(6, " ")

    last = new Date()

    // eslint-disable-next-line no-console
    console.log(`${s.padEnd(14, " ")} ${time} ms elapsed`)
  }
}())

module.exports = trace
