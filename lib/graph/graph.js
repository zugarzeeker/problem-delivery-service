const Graph = require('./graph-data-structure')
const { graphParser } = require('./graphparser')

const _simpleCache = {}

const createGraph = (longtext) => {
  if (_simpleCache[longtext]) {
    return _simpleCache[longtext]
  }
  const existNodes = {}
  const graph = new Graph()
  longtext
    .split(', ')
    .map((text) => graphParser(text))
    .forEach(([node1, node2, weight]) => {
      if (!existNodes[node1]) {
        graph.addNode(node1)
      }
      if (!existNodes[node2]) {
        graph.addNode(node2)
      }
      graph.addEdge(node1, node2, +weight)
    })
  _simpleCache[longtext] = graph
  return graph
}

module.exports.createGraph = createGraph
