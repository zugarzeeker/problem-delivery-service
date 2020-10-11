const { calculateDeliveryCost } = require('./delivery-cost')

const GRAPH_TEXT = 'AB1, AC4, AD10, BE3, CD4, CF2, DE1, EB3, EA2, FD1'

const testDeliveryCost = (graphtext, route, expectedCost) => {
  it(`should calculate delivery cost of ${route}`, () => {
    expect(calculateDeliveryCost(graphtext, route)).toEqual(expectedCost)
  })
}

describe(`DeliveryCost (${GRAPH_TEXT})`, () => {
  testDeliveryCost(GRAPH_TEXT, 'A-B-E', 4)
  testDeliveryCost(GRAPH_TEXT, 'A-D', 10)
  testDeliveryCost(GRAPH_TEXT, 'E-A-C-F', 8)
  testDeliveryCost(GRAPH_TEXT, 'A-D-F', 'No Such Route')
  testDeliveryCost(GRAPH_TEXT, 'A-F', 'No Such Route')
  testDeliveryCost(GRAPH_TEXT, 'B-E-B-E-B', 12)
  testDeliveryCost(GRAPH_TEXT, 'A-A', 'No Such Route')
  testDeliveryCost('AA2', 'A-A', 2)
  testDeliveryCost('AA0', 'A-A', 'No Such Route')
})
