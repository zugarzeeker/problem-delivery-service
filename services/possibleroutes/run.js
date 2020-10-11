const { calculatePossibleRoutes } = require('./possibleroutes')

const GRAPH_TEXT = 'AB1, AC4, AD10, BE3, CD4, CF2, DE1, EB3, EA2, FD1, DZ1000'
// const GRAPH_TEXT = 'AB1, AC4, AD10, BE3, CD4, CF2, DE1, EB3, EA2, FD1'
// const GRAPH_TEXT = 'AB1, BE3, EB3, AD10, EA2'

console.log({
  result: calculatePossibleRoutes(GRAPH_TEXT, 'E-D'),
})
console.log('===============================')
console.log({
  result: calculatePossibleRoutes(GRAPH_TEXT, 'E-E'),
})

// console.log({
//   result: calculatePossibleRoutes(GRAPH_TEXT, 'A-E'),
// })
