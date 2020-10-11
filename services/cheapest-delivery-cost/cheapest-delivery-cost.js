const { createGraph } = require('../../lib/graph/graph')

const calculateCheapestDeliveryCost = (graphtext, route) => {
  let [sourceNode, targetNode] = route.split('-')
  const graph = createGraph(graphtext)

  try {
    let [currentNode, ...nextNodes] = graph.shortestPath(sourceNode, targetNode)

    let sumWeight = 0
    nextNodes.forEach((nextNode) => {
      const weight = graph.getEdgeWeight(currentNode, nextNode, 0)
      sumWeight += weight
      currentNode = nextNode
    })
    return sumWeight
  } catch (e) {
    // HACK: with try-catch shortest path
    if (e.message === 'No path found') {
      return 'No Such Route'
    }
  }
}

module.exports.calculateCheapestDeliveryCost = calculateCheapestDeliveryCost
