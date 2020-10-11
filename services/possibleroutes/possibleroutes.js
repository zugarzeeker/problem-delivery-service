const { createGraph } = require('../../lib/graph')

const debug = false
const log = (...o) => debug && console.log(...o)

const calculatePossibleRoutes = (
  graphtext,
  route,
  {
    limitStops = Infinity,
    limitDistance = Infinity,
    sameRouteEnable = false,
  } = {},
) => {
  const graph = createGraph(graphtext)
  let [sourceNode, targetNode] = route.split('-')

  let countPath = 0
  //   let existPaths = {}
  const visited = {}
  function traverse(
    u,
    path = sourceNode,
    countStop = 0,
    distance = 0,
    {
      limitStops = Infinity,
      limitDistance = Infinity,
      sameRouteEnable = false,
    } = {},
  ) {
    log(path)
    const nextNodes = graph.adjacent(u)
    visited[u] = true
    if (countStop >= limitStops) {
      return
    }
    for (let i = 0; i < nextNodes.length; i++) {
      const v = nextNodes[i]
      const updatedPath = `${path} -> ${v}`
      const targetPath = `${u} -> ${v}`
      if (!sameRouteEnable) {
        const existPath = path.includes(targetPath)
        // const existPath = existPaths[targetPath]
        log({
          existPath,
          updatedPath,
          u,
          v,
          path,
        })
        if (existPath) {
          continue
        }
        existPaths[targetPath] = true
      }
      const weight = graph.getEdgeWeight(u, v, 0)
      const newDistance = distance + weight
      if (v === targetNode) {
        if (newDistance >= limitDistance) {
          continue
        }
        log('[found]', `[[ ${newDistance} ]]`, updatedPath)
        countPath++
        if (!sameRouteEnable) {
          continue
        }
      }
      traverse(v, updatedPath, countStop + 1, newDistance, {
        limitStops,
        limitDistance,
        sameRouteEnable,
      })
    }
  }

  const startPath = sourceNode
  const distance = 0
  traverse(sourceNode, startPath, countPath, distance, {
    limitStops,
    limitDistance,
    sameRouteEnable,
  })
  if (countPath === 0) {
    return 'No Such Route'
  }
  return countPath
}

module.exports.calculatePossibleRoutes = calculatePossibleRoutes
