const io = factory()

io.new = factory

function factory (queue = []) {

  return {
    last: () => queue.slice(-1)[0],
    puts (val) {queue.push(val)},
    read () {return queue.shift()},
    reset () {queue = []}
  }
}

module.exports = io
