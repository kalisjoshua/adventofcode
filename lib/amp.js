function ampFactory () {
  let output
  const queue = []
  // const queueIn = []
  // const queueOut = []
  //
  // function dequeue () {
  //   if (queueIn.length) {
  //     return queueIn.shift()
  //   } else {
  //     let resolve
  //     const promise = new Promise((res) => {resolve = res})
  //     const pending = {promise, resolve}
  //
  //     queueOut.push(pending)
  //
  //     return pending.promise
  //   }
  // }
  //
  // function enqueue (val) {
  //   if (queueOut.length) {
  //     queueOut.shift().resolve(val)
  //   } else {
  //     queueIn.push(Promise.resolve(val))
  //   }
  // }

  function init (_output) {
    output = _output

    return run
  }

  function run (memory) {}

  return {init}
}

module.exports = ampFactory
