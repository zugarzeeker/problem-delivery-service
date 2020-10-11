const { graphParser } = require('./graphparser')

describe('graphParser', () => {
  it('should parse AB10 to [A, B, 10]', () => {
    expect(graphParser('AB10')).toEqual(['A', 'B', 10])
  })
})
