const getInput = require("./getInput")

console.log(Math.random())

describe("getInput", () => {
  it("should construct paths", () => {
    const file = "getInput.js"
    const expected = require("fs").readFileSync(`./src/${file}`, "utf8")
    const result = getInput("", file)

    expect(result).toBe(expected)
  })
})
