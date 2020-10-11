const { calculatePossibleRoutes } = require('./possible-routes')

const GRAPH_TEXT = 'AB1, AC4, AD10, BE3, CD4, CF2, DE1, EB3, EA2, FD1, DZ1000'
// const GRAPH_TEXT = 'AB1, BE3, EB3'

const testCalculatePossibleRoutes = (
  graphtext,
  route,
  options,
  expectedCost,
) => {
  it(`should calculate possible routes of ${route}`, () => {
    expect(calculatePossibleRoutes(graphtext, route, options)).toEqual(
      expectedCost,
    )
  })
}

describe(`PossibleRoutes (${GRAPH_TEXT})`, () => {
  testCalculatePossibleRoutes(
    GRAPH_TEXT,
    'E-D',
    { sameRouteEnable: false, limitStops: 4 },
    4,
  )
  testCalculatePossibleRoutes(GRAPH_TEXT, 'E-E', { sameRouteEnable: false }, 5)

  // BONUS
  testCalculatePossibleRoutes(
    GRAPH_TEXT,
    'E-E',
    { sameRouteEnable: true, limitDistance: 20 },
    29,
  )
})
