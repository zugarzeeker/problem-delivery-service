const { createGraph } = require('../../lib/graph')

const debug = false
const log = (...o) => debug && console.log(...o)

const calculatePossibleRoutes = (
  graphtext,
  route,
  { limitStops = Infinity, sameRouteEnable = false } = {},
) => {
  const graph = createGraph(graphtext)
  let [sourceNode, targetNode] = route.split('-')

  let countPath = 0
  let existPaths = {}
  function traverse(
    u,
    path = sourceNode,
    countStop = 0,
    {
      limitStops = Infinity,
      limitDistance = Infinity,
      sameRouteEnable = false,
    } = {},
  ) {
    log(path)
    const nextNodes = graph.adjacent(u)
    if (countStop >= limitStops + 1) {
      return
    }
    for (let i = 0; i < nextNodes.length; i++) {
      const v = nextNodes[i]
      const updatedPath = `${path} -> ${v}`
      const targetPath = `${u} -> ${v}`
      if (!sameRouteEnable) {
        const existPath = path.includes(targetPath)
        // const existPath = existPaths[targetPath]
        // log({
        //   existPath,
        //   updatedPath,
        //   u,
        //   v,
        //   path,
        // })
        if (existPath) {
          continue
        }
        existPaths[targetPath] = true
      }
      if (v === targetNode) {
        // log('[found]', updatedPath)
        countPath++
        if (!sameRouteEnable) {
          return
        }
      }
      traverse(v, updatedPath, countStop + 1, {
        limitStops,
        limitDistance,
        sameRouteEnable,
      })
    }
  }

  const startPath = sourceNode
  traverse(sourceNode, startPath, countPath, { limitStops, sameRouteEnable })
  if (countPath === 0) {
    return 'No Such Route'
  }
  return countPath
}

module.exports.calculatePossibleRoutes = calculatePossibleRoutes
