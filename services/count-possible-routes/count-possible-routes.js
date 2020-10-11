const { createGraph } = require('../../lib/graph')

const debug = false
const log = (...o) => debug && console.log(...o)

const countPossibleRoutes = (
  graphtext,
  route,
  {
    maxStops = Infinity,
    lessThanDistance = Infinity,
    sameRouteEnable = false,
  } = {},
) => {
  const graph = createGraph(graphtext)
  let [sourceNode, targetNode] = route.split('-')

  let countPath = 0
  const visited = {}
  function traverse(
    u,
    path = sourceNode,
    countStop = 0,
    distance = 0,
    {
      maxStops = Infinity,
      lessThanDistance = Infinity,
      sameRouteEnable = false,
    } = {},
  ) {
    log(path)
    const nextNodes = graph.adjacent(u)
    visited[u] = true
    if (countStop >= maxStops) {
      return
    }
    for (let i = 0; i < nextNodes.length; i++) {
      const v = nextNodes[i]
      const updatedPath = `${path} -> ${v}`
      const targetPath = `${u} -> ${v}`
      if (!sameRouteEnable) {
        const existPath = path.includes(targetPath)
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
      }
      const weight = graph.getEdgeWeight(u, v, 0)
      const newDistance = distance + weight
      if (v === targetNode) {
        if (newDistance >= lessThanDistance) {
          continue
        }
        log('[found]', `[[ ${newDistance} ]]`, updatedPath)
        countPath++
        if (!sameRouteEnable) {
          continue
        }
      }
      traverse(v, updatedPath, countStop + 1, newDistance, {
        maxStops,
        lessThanDistance,
        sameRouteEnable,
      })
    }
  }

  const startPath = sourceNode
  const distance = 0
  traverse(sourceNode, startPath, countPath, distance, {
    maxStops,
    lessThanDistance,
    sameRouteEnable,
  })
  if (countPath === 0) {
    return 'No Such Route'
  }
  return countPath
}

module.exports.countPossibleRoutes = countPossibleRoutes
