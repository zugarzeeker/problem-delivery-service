const { createGraph } = require('../../lib/graph')

const calculateDeliveryCost = (graphtext, route) => {
  const graph = createGraph(graphtext)
  let [currentNode, ...nextNodes] = route.split('-')

  let sumWeight = 0

  for (let i = 0; i < nextNodes.length; i++) {
    const nextNode = nextNodes[i]
    const weight = graph.getEdgeWeight(currentNode, nextNode, 0)
    const pathExist = graph.hasEdgeBetween(currentNode, nextNode)
    if (!pathExist) {
      return 'No Such Route'
    }
    sumWeight += weight
    currentNode = nextNode
  }
  return sumWeight
}

module.exports.calculateDeliveryCost = calculateDeliveryCost
