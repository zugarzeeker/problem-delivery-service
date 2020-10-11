const { createGraph } = require('./graph')

const testCalculateShortestPath = (graphtext, route, expected) => {
  const graph = createGraph(graphtext)
  const [sourceNode, targetNode] = route.split('-')
  const result = graph.shortestPath(sourceNode, targetNode).join(' -> ')
  it(`should calculate shortest path of ${route}`, () => {
    expect(result).toEqual(expected)
  })
}

const GRAPTH_TEXT = 'AB10, AC7, BC2'
describe(`ShortestPath ${GRAPTH_TEXT}`, () => {
  testCalculateShortestPath(GRAPTH_TEXT, 'A-C', 'A -> C')
})

const GRAPTH_TEXT_2 = 'AB1, AC70, BC2'
describe(`ShortestPath ${GRAPTH_TEXT_2}`, () => {
  testCalculateShortestPath(GRAPTH_TEXT_2, 'A-C', 'A -> B -> C')
})

const GRAPTH_TEXT_3 = 'AB1, BA1'
describe(`ShortestPath ${GRAPTH_TEXT_3}`, () => {
  testCalculateShortestPath(GRAPTH_TEXT_3, 'A-A', 'A -> B -> A')
})

const GRAPTH_TEXT_4 = 'AB1, BA100, BC1, CA1'
describe(`ShortestPath ${GRAPTH_TEXT_4}`, () => {
  testCalculateShortestPath(GRAPTH_TEXT_4, 'A-A', 'A -> B -> C -> A')
})

const GRAPTH_TEXT_5 = 'AA1, AB1, BA100'
describe(`ShortestPath ${GRAPTH_TEXT_5}`, () => {
  testCalculateShortestPath(GRAPTH_TEXT_5, 'A-A', 'A -> A')
})

const GRAPTH_TEXT_6 = 'AA100, AB1, BA1'
describe(`ShortestPath ${GRAPTH_TEXT_6}`, () => {
  testCalculateShortestPath(GRAPTH_TEXT_6, 'A-A', 'A -> B -> A')
})

// TODO: Add Cases "no path found"
// const GRAPTH_TEXT_7 = 'AB1, AC1'
// describe(`ShortestPath ${GRAPTH_TEXT_7}`, () => {
//   testCalculateShortestPath(GRAPTH_TEXT_7, 'B-C', 'No path found')
// })
