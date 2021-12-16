// const example = "D2FE28"
// const example = "38006F45291200"
// const example = "EE00D40C823060"
// const example = "8A004A801A8002F478"             // version sum 16
// const example = "620080001611562C8802118E34"     // version sum 12
// const example = "C0015000016115A2E0802F182340"   // version sum 23
// const example = "A0016C880162017C3686B18A3D4780" // version sum 31

const LITERAL_VALUE_PACKET_TYPE_ID = 4
const TYPE_LENGTH = 3
const VERSION_LENGTH = 3

const sumVersionNumbers = ({subpackets = [], version}) => version + subpackets
  .map(sumVersionNumbers)
  .reduce((a, b) => a + b, 0)

function literalValueParser (version, body) {
  let acc = ""
  let prefix
  let group

  do {
    [prefix, group, body] = body.match(/^(\d)(\d{4})(.*)/).slice(1)
    acc += group
  } while (prefix === "1")

  return {body, value: parseInt(acc, 2), version}
}

function operatorParser (version, operator, body) {
  const subpackets = []
  const lengthTypeId = body[0]
  let limitFn

  if (lengthTypeId == 0) {
    const lenBits = 15 + 1
    let targetLength = body.length - lenBits - parseInt(body.slice(1, lenBits), 2)

    body = body.slice(lenBits)
    limitFn = () => body.length > targetLength
  } else {
    const subpacketCountBits = 11 + 1
    const targetSubpackets = parseInt(body.slice(1, subpacketCountBits), 2)

    body = body.slice(subpacketCountBits)
    limitFn = () => subpackets.length < targetSubpackets
  }

  do {
    const result = parserFn(body)

    body = result.body
    delete result.body

    subpackets.push(result)
  } while (limitFn())

  return {body, operator, subpackets, version}
}

function parserFn (dec, verLen = VERSION_LENGTH, typeLen = TYPE_LENGTH) {
  const [packetVersion, packetTypeId] = dec
    .match(new RegExp(`^(\\d{${verLen}})(\\d{${typeLen}})`))
    .slice(1)
    .map((bin) => parseInt(bin, 2))
  let body = dec
    .slice(verLen + typeLen)

  return packetTypeId === LITERAL_VALUE_PACKET_TYPE_ID
    ? literalValueParser(packetVersion, body)
    : operatorParser(packetVersion, packetTypeId, body)
}

module.exports = (input, {report}) => {
  input = input
    .trim()
    .split("")
    .map((hex) => parseInt(hex, 16).toString(2).padStart(4, "0"))
    .join("")

  const parsed = parserFn(input)
  // console.log(JSON.stringify(parsed, null, 4))

  const partOne = sumVersionNumbers(parsed)

  // const partTwo = input

  report('Part one', partOne, 920)
  // report('Part two', partTwo)
}
