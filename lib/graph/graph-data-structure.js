// Reference
// https://github.com/datavis-tech/graph-data-structure/blob/7c4d36ea461997f7c8c58bbabd9670e6bacfe644/index.js
//
// ============ my updated ================
// - update shortest path code
// - remove unused code for this project
// - add function `hasEdgeBetween` to improve perfomance from `bruteforce` checking adjacent list directly
// ========================================

'use strict'
// A graph data structure with depth-first search and topological sort.
function Graph(serialized) {
  // Returned graph instance
  var graph = {
    addNode: addNode,
    removeNode: removeNode,
    nodes: nodes,
    adjacent: adjacent,
    addEdge: addEdge,
    removeEdge: removeEdge,
    setEdgeWeight: setEdgeWeight,
    getEdgeWeight: getEdgeWeight,
    shortestPath: shortestPath,
    serialize: serialize,
    deserialize: deserialize,
    hasEdgeBetween: hasEdgeBetween,
  }
  // The adjacency list of the graph.
  // Keys are node ids.
  // Values are adjacent node id arrays.
  var edges = {}
  // The weights of edges.
  // Keys are string encodings of edges.
  // Values are weights (numbers).
  var edgeWeights = {}
  // If a serialized graph was passed into the constructor, deserialize it.
  if (serialized) {
    deserialize(serialized)
  }

  // Adds a node to the graph.
  // If node was already added, this function does nothing.
  // If node was not already added, this function sets up an empty adjacency list.
  function addNode(node) {
    edges[node] = adjacent(node)
    return graph
  }
  // Removes a node from the graph.
  // Also removes incoming and outgoing edges.
  function removeNode(node) {
    // Remove incoming edges.
    Object.keys(edges).forEach(function (u) {
      edges[u].forEach(function (v) {
        if (v === node) {
          removeEdge(u, v)
        }
      })
    })
    // Remove outgoing edges (and signal that the node no longer exists).
    delete edges[node]
    return graph
  }
  // Gets the list of nodes that have been added to the graph.
  function nodes() {
    // TODO: Better implementation with set data structure
    var nodeSet = {}
    Object.keys(edges).forEach(function (u) {
      nodeSet[u] = true
      edges[u].forEach(function (v) {
        nodeSet[v] = true
      })
    })
    return Object.keys(nodeSet)
  }
  // Gets the adjacent node list for the given node.
  // Returns an empty array for unknown nodes.
  function adjacent(node) {
    return edges[node] || []
  }
  // Computes a string encoding of an edge,
  // for use as a key in an object.
  function encodeEdge(u, v) {
    return u + '|' + v
  }

  // โค้ดส่วนนี้ ที่ patch lib ไป สามารถ ย้ายออกมาได้ แล้วเขียนเป็น util
  // Check edge between 2 nodes
  // Returns boolean (true = exist, false = not exist)
  function hasEdgeBetween(u, v) {
    return !!edgeWeights[encodeEdge(u, v)]
  }

  // Sets the weight of the given edge.
  function setEdgeWeight(u, v, weight) {
    edgeWeights[encodeEdge(u, v)] = weight
    return graph
  }
  // Gets the weight of the given edge.
  // Returns 1 if no weight was previously set.
  function getEdgeWeight(u, v) {
    var weight = edgeWeights[encodeEdge(u, v)]
    return weight === undefined ? 1 : weight
  }
  // Adds an edge from node u to node v.
  // Implicitly adds the nodes if they were not already added.
  function addEdge(u, v, weight) {
    addNode(u)
    addNode(v)
    adjacent(u).push(v)
    if (weight !== undefined) {
      setEdgeWeight(u, v, weight)
    }
    return graph
  }
  // Removes the edge from node u to node v.
  // Does not remove the nodes.
  // Does nothing if the edge does not exist.
  function removeEdge(u, v) {
    if (edges[u]) {
      edges[u] = adjacent(u).filter(function (_v) {
        return _v !== v
      })
    }
    return graph
  }

  // Dijkstra's Shortest Path Algorithm.
  // Cormen et al. "Introduction to Algorithms" 3rd Ed. p. 658
  // Variable and function names correspond to names in the book.
  function shortestPath(_source, destination) {
    // make temp source for self-loop
    //===========================================
    // TODO: Refactor dummy source string
    // มีอีกวิธีคือ เปลี่ยนแค่ชื่อ แล้ว Refactor code ที่เกี่ยวกับ source เช่น adjacent, weight ของ edge
    // ถ้าใช้วิธี แมพชื่อ จะไม่ต้องเปลืองมา ตัดต่อกราฟเพิ่มแบบนี้
    // อาจจะ ย้าย business logic code นี้ไปอยู่ที่ cheapest-delivery-cost แทน
    // จะได้คงความเป็น lib ไว้เหมือนเดิม (ไม่ต้อง patch lib)
    const dummySource = '[[DUMMY_SOURCE]]'
    addNode(dummySource)
    adjacent(_source).forEach((node) => {
      const weight = getEdgeWeight(_source, node)
      addEdge(dummySource, node)
      setEdgeWeight(dummySource, node, weight)
    })
    const source = dummySource
    // const source = _source
    //===========================================
    // Upper bounds for shortest path weights from source.
    var d = {}
    // Predecessors.
    var p = {}
    // Poor man's priority queue, keyed on d.
    var q = {}
    function initializeSingleSource() {
      nodes().forEach(function (node) {
        d[node] = Infinity
      })
      if (d[source] !== Infinity) {
        throw new Error('Source node is not in the graph')
      }
      if (d[destination] !== Infinity) {
        throw new Error('Destination node is not in the graph')
      }
      d[source] = 0
    }
    // Adds entries in q for all nodes.
    function initializePriorityQueue() {
      nodes().forEach(function (node) {
        q[node] = true
      })
    }
    // Returns true if q is empty.
    function priorityQueueEmpty() {
      return Object.keys(q).length === 0
    }
    // Linear search to extract (find and remove) min from q.
    function extractMin() {
      var min = Infinity
      var minNode
      Object.keys(q).forEach(function (node) {
        if (d[node] < min) {
          min = d[node]
          minNode = node
        }
      })
      if (minNode === undefined) {
        // If we reach here, there's a disconnected subgraph, and we're done.
        q = {}
        return null
      }
      delete q[minNode]
      return minNode
    }
    function relax(u, v) {
      var w = getEdgeWeight(u, v)
      if (d[v] > d[u] + w) {
        d[v] = d[u] + w
        p[v] = u
      }
    }
    function dijkstra() {
      initializeSingleSource()
      initializePriorityQueue()
      var _loop_1 = function () {
        var u = extractMin()
        if (u === null) return { value: void 0 }
        adjacent(u).forEach(function (v) {
          relax(u, v)
        })
      }
      while (!priorityQueueEmpty()) {
        var state_1 = _loop_1()
        if (typeof state_1 === 'object') return state_1.value
      }
    }
    // Assembles the shortest path by traversing the
    // predecessor subgraph from destination to source.
    function path() {
      var nodeList = []
      var weight = 0
      var node = destination
      while (p[node]) {
        nodeList.push(node)
        weight += getEdgeWeight(p[node], node)
        node = p[node]
      }
      if (node !== source) {
        throw new Error('No path found')
      }
      nodeList.push(node)
      nodeList.reverse()
      nodeList.weight = weight
      return nodeList
    }
    dijkstra()
    const result = path()
    // make temp source for self-loop
    // ==========================================
    removeNode(dummySource)
    // safe checking
    if (result[0] === dummySource) {
      result[0] = _source
    }
    //===========================================
    return result
  }
  // Serializes the graph.
  function serialize() {
    var serialized = {
      nodes: nodes().map(function (id) {
        return { id: id }
      }),
      links: [],
    }
    serialized.nodes.forEach(function (node) {
      var source = node.id
      adjacent(source).forEach(function (target) {
        serialized.links.push({
          source: source,
          target: target,
          weight: getEdgeWeight(source, target),
        })
      })
    })
    return serialized
  }
  // Deserializes the given serialized graph.
  function deserialize(serialized) {
    serialized.nodes.forEach(function (node) {
      addNode(node.id)
    })
    serialized.links.forEach(function (link) {
      addEdge(link.source, link.target, link.weight)
    })
    return graph
  }
  // The returned graph instance.
  return graph
}
module.exports = Graph
