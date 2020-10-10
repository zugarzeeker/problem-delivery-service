const graphParser = (pair) => {
  const arr = pair.split('')
  const node1 = arr.shift()
  const node2 = arr.shift()
  const weight = +arr.join('')
  return [node1, node2, weight]
}

module.exports.graphParser = graphParser
