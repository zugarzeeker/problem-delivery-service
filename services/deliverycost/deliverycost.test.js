const { calculateDeliveryCost } = require('./deliverycost')

const GRAPH_TEXT = 'AB1, AC4, AD10, BE3, CD4, CF2, DE1, EB3, EA2, FD1'

const testDeliveryCost = (route, expectedCost) => {
  it(`should calculate cost of ${route}`, () => {
    expect(calculateDeliveryCost(GRAPH_TEXT, route)).toEqual(expectedCost)
  })
}

describe(`DeliveryCost (${GRAPH_TEXT})`, () => {
  testDeliveryCost('A-B-E', 4)
  testDeliveryCost('A-D', 10)
  testDeliveryCost('E-A-C-F', 8)
  testDeliveryCost('A-D-F', 'No Such Route')
  testDeliveryCost('A-F', 'No Such Route')
  // TODO: Add test cases
  // A-A
  // A-B-A
  // A-B-C-B-A
})
