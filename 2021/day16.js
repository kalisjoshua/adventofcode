// const example = "D2FE28"
// const example = "38006F45291200"
// const example = "EE00D40C823060"
// const example = "8A004A801A8002F478"             // version sum 16
// const example = "620080001611562C8802118E34"     // version sum 12
// const example = "C0015000016115A2E0802F182340"   // version sum 23
// const example = "A0016C880162017C3686B18A3D4780" // version sum 31

// C200B40A82 finds the sum of 1 and 2, resulting in the value 3.
// 04005AC33890 finds the product of 6 and 9, resulting in the value 54.
// 880086C3E88112 finds the minimum of 7, 8, and 9, resulting in the value 7.
// CE00C43D881120 finds the maximum of 7, 8, and 9, resulting in the value 9.
// D8005AC2A8F0 produces 1, because 5 is less than 15.
// F600BC2D8F produces 0, because 5 is not greater than 15.
// 9C005AC2F8F0 produces 0, because 5 is not equal to 15.
// 9C0141080250320F1802104A08 produces 1, because 1 + 3 = 2 * 2.
const example = "9C0141080250320F1802104A08"

const LITERAL_VALUE_PACKET_TYPE_ID = 4
const TYPE_LENGTH = 3
const VERSION_LENGTH = 3

const sumVersionNumbers = ({subpackets = [], version}) => version + subpackets
  .map(sumVersionNumbers)
  .reduce((a, b) => a + b, 0)

function evaluator (tree) {
  if (tree.value) return tree.value

  const subpackets = tree.subpackets
    .map(evaluator)

  switch (tree.operator) {
    // 0 - sum
    //    their value is the sum of the values of their sub-packets. If they
    //    only have a single sub-packet, their value is the value of the
    //    sub-packet.
    case 0:
      return subpackets
        .reduce((a, b) => a + b, 0)
    // 1 - product
    //    their value is the result of multiplying together the values of their
    //    sub-packets. If they only have a single sub-packet, their value is the
    //    value of the sub-packet.
    case 1:
      return subpackets
        .reduce((a, b) => a * b, 1)
    // 2 - minimum
    //    their value is the minimum of the values of their sub-packets.
    case 2:
      return Math.min(...subpackets)
    // 3 - maximum
    //    their value is the maximum of the values of their sub-packets.
    case 3:
      return Math.max(...subpackets)
    // 5 - greater than
    //    their value is 1 if the value of the first sub-packet is greater than
    //    the value of the second sub-packet; otherwise, their value is 0. These
    //    packets always have exactly two sub-packets.
    case 5:
      return subpackets
        .reduce((a, b) => a > b ? 1 : 0)
    // 6 - less than
    //    their value is 1 if the value of the first sub-packet is less than the
    //    value of the second sub-packet; otherwise, their value is 0. These
    //    packets always have exactly two sub-packets.
    case 6:
      return subpackets
        .reduce((a, b) => a < b ? 1 : 0)
    // 7 - equal to
    //    their value is 1 if the value of the first sub-packet is equal to the
    //    value of the second sub-packet; otherwise, their value is 0. These
    //    packets always have exactly two sub-packets.
    case 7:
      return subpackets
        .reduce((a, b) => a === b ? 1 : 0)
  }
}

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

  const partOne = sumVersionNumbers(parsed)

  const partTwo = evaluator(parsed)

  report('Part one', partOne, 920)
  report('Part two', partTwo, 10185143721112)
}
