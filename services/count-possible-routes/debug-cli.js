const { countPossibleRoutes } = require('./count-possible-routes')

const GRAPH_TEXT = 'AB1, AC4, AD10, BE3, CD4, CF2, DE1, EB3, EA2, FD1, DZ1000'
// const GRAPH_TEXT = 'AB1, AC4, AD10, BE3, CD4, CF2, DE1, EB3, EA2, FD1'
// const GRAPH_TEXT = 'AB1, BE3, EB3, AD10, EA2'
// const GRAPH_TEXT = 'AC4, CF2, EA2, FD1'

// console.log({
//   result: countPossibleRoutes(GRAPH_TEXT, 'E-D', {
//     sameRouteEnable: false,
//     maxStops: 4,
//   }),
// })
// console.log('=========[found]======================')
// console.log({
//   result: countPossibleRoutes(GRAPH_TEXT, 'E-E', {
//     sameRouteEnable: false,
//   }),
// })

console.log({
  result: countPossibleRoutes('AB1, BA1, AC1, CA1', 'A-A', {
    sameRouteEnable: true,
    lessThanDistance: 5,
  }),
})
