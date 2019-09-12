import * as helpers from './helpers'

describe('Slider helpers', () => {
  describe('constrain()', () => {
    it('should constrain to the slider width by default', () => {
      const expected = 373
      const actual = helpers.constrain(373)
      expect(expected).toEqual(actual)
    })
    it('should limit a larger positive value', () => {
      const expected = 500
      const actual = helpers.constrain(1235, 1000)
      expect(expected).toEqual(actual)
    })
    it('should not limit a smaller positive value', () => {
      const expected = 126
      const actual = helpers.constrain(126, 1000)
      expect(expected).toEqual(actual)
    })
    it('should limit a larger negative value', () => {
      const expected = -500
      const actual = helpers.constrain(-501, 1000)
      expect(expected).toEqual(actual)
    })
    it('should not limit a smaller negative value', () => {
      const expected = -354
      const actual = helpers.constrain(-354, 1000)
      expect(expected).toEqual(actual)
    })
    it('should work when bounds are 0', () => {
      const expected = 0
      const actual = helpers.constrain(1000, 0)
      expect(expected).toEqual(actual)
    })
  })
})
