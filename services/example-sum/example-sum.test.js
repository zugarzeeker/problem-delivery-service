const { sum } = require('./example-sum')

describe('Sum', () => {
  it('should be calculate 1 + 2 = 3', () => {
    expect(sum(1, 2)).toEqual(3)
  })
})
