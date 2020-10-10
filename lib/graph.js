const Graph = require('graph-data-structure')
const { graphParser } = require('./graphparser')

const createGraph = (longtext, { hackTargetNodeForShortestPath = '' } = {}) => {
  const existNodes = {}
  const graph = new Graph()
  longtext
    .split(', ')
    .map((text) => graphParser(text))
    .forEach(([node1, _node2, weight]) => {
      // HACK for shortest path
      let node2 = _node2
      if (node2.toLowerCase() === hackTargetNodeForShortestPath) {
        node2 = hackTargetNodeForShortestPath
      }
      // ======================================
      if (!existNodes[node1]) {
        graph.addNode(node1)
      }
      if (!existNodes[node2]) {
        graph.addNode(node2)
      }
      graph.addEdge(node1, node2, +weight)
    })
  return graph
}

module.exports.createGraph = createGraph
