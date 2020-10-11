const { countPossibleRoutes } = require('./count-possible-routes')

const GRAPH_TEXT = 'AB1, AC4, AD10, BE3, CD4, CF2, DE1, EB3, EA2, FD1, DZ1000'

const testcountPossibleRoutes = (graphtext, route, options, expectedCost) => {
  it(`should calculate possible routes of ${route}`, () => {
    expect(countPossibleRoutes(graphtext, route, options)).toEqual(expectedCost)
  })
}

describe(`CountPossibleRoutes (${GRAPH_TEXT})`, () => {
  testcountPossibleRoutes(
    GRAPH_TEXT,
    'E-D',
    { sameRouteEnable: false, maxStops: 4 },
    4,
  )
  testcountPossibleRoutes(GRAPH_TEXT, 'E-E', { sameRouteEnable: false }, 5)

  testcountPossibleRoutes(
    'AB1, AC1, AD1, BD1, CD1, BE1, CE1',
    'A-D',
    { sameRouteEnable: false },
    3,
  )

  testcountPossibleRoutes(
    'AB1, AC1, AD1, BD1, CD1',
    'A-D',
    { sameRouteEnable: false },
    3,
  )

  testcountPossibleRoutes(
    'AB1, BA1, AC1, CA1, AD1, DA1',
    'A-A',
    { sameRouteEnable: false },
    3,
  )

  // BONUS
  testcountPossibleRoutes(
    'AB1, BA1',
    'A-B',
    { sameRouteEnable: true, maxStops: 3 },
    2,
  )

  testcountPossibleRoutes(
    'AB1, BA1',
    'A-B',
    { sameRouteEnable: true, maxStops: 4 },
    2,
  )

  testcountPossibleRoutes(
    'AB1, BA1',
    'A-B',
    { sameRouteEnable: true, maxStops: 5 },
    3,
  )

  testcountPossibleRoutes(
    'AB1, BA1',
    'A-B',
    { sameRouteEnable: true, lessThanDistance: 2 },
    1,
  )

  testcountPossibleRoutes(
    'AB1, BA1',
    'A-B',
    { sameRouteEnable: true, lessThanDistance: 3 },
    1,
  )

  testcountPossibleRoutes(
    'AB1, BA1',
    'A-B',
    { sameRouteEnable: true, lessThanDistance: 2 },
    1,
  )

  testcountPossibleRoutes(
    'AB1, BA1, AC1, CA1',
    'A-A',
    { sameRouteEnable: true, lessThanDistance: 2 },
    'No Such Route',
  )

  testcountPossibleRoutes(
    'AB1, BA1, AC1, CA1',
    'A-A',
    { sameRouteEnable: true, lessThanDistance: 3 },
    2,
  )

  testcountPossibleRoutes(
    'AB1, BA1, AC1, CA1',
    'A-A',
    { sameRouteEnable: true, lessThanDistance: 4 },
    2,
  )

  testcountPossibleRoutes(
    'AB1, BA1, AC1, CA1',
    'A-A',
    { sameRouteEnable: true, lessThanDistance: 5 },
    6,
  )

  testcountPossibleRoutes(
    GRAPH_TEXT,
    'E-E',
    { sameRouteEnable: true, lessThanDistance: 20 },
    29,
  )
})
