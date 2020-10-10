const { calculateCheapestDeliveryCost } = require('./cheapestdeliverycost')

const GRAPH_TEXT = 'AB1, AC4, AD10, BE3, CD4, CF2, DE1, EB3, EA2, FD1, DZ1000'

const testCheapestDeliveryCost = (graphtext, route, expectedCost) => {
  it(`should calculate cheapest delivery cost of ${route}`, () => {
    expect(calculateCheapestDeliveryCost(graphtext, route)).toEqual(
      expectedCost,
    )
  })
}

describe(`CheapestDeliveryCost (${GRAPH_TEXT})`, () => {
  testCheapestDeliveryCost(GRAPH_TEXT, 'E-D', 9)
  testCheapestDeliveryCost(GRAPH_TEXT, 'E-E', 6)
  testCheapestDeliveryCost(GRAPH_TEXT, 'D-Z', 1000)
  testCheapestDeliveryCost(GRAPH_TEXT, 'Z-A', 'No Such Route')
  testCheapestDeliveryCost('AB2, BA3', 'A-A', 5)
  testCheapestDeliveryCost('AB2, BA3', 'A-B', 2)
})
