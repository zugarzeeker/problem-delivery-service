const { createGraph } = require('../../lib/graph')

const calculateCheapestDeliveryCost = (graphtext, route) => {
  let [sourceNode, targetNode] = route.split('-')
  // HACK cycle with lowerCase
  const graph = createGraph(graphtext, {
    hackTargetNodeForShortestPath:
      sourceNode === targetNode ? targetNode.toLowerCase() : '',
  })

  if (sourceNode === targetNode) {
    targetNode = targetNode.toLowerCase()
  }
  // ===================================

  try {
    let [currentNode, ...nextNodes] = graph.shortestPath(sourceNode, targetNode)

    // Refactor
    let sumWeight = 0
    for (let i = 0; i < nextNodes.length; i++) {
      const nextNode = nextNodes[i]
      const weight = graph.getEdgeWeight(currentNode, nextNode, 0)
      // TODO: Check Perfomance
      const pathExist = graph.adjacent(currentNode).includes(nextNode)
      if (!pathExist) {
        return 'No Such Route'
      }
      sumWeight += weight
      currentNode = nextNode
    }
    return sumWeight
  } catch (e) {
    // HACK: with try-catch shortest path
    if (e.message === 'No path found') {
      return 'No Such Route'
    }
  }
}

module.exports.calculateCheapestDeliveryCost = calculateCheapestDeliveryCost
