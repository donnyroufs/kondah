import { Utils } from '../src/utils'

describe('utils', () => {
  describe('createLabel()', () => {
    test('adds an empty char to the front and back', () => {
      const rawLabel = 'label'
      const label = Utils.createLabel(rawLabel)
      const expectedLabel = ' LABEL '

      expect(label).toBe(expectedLabel)
    })

    test('label is always uppercased', () => {
      const rawLabel = 'label'
      const label = Utils.createLabel(rawLabel)
      const expectedLabel = ' LABEL '

      expect(label).toBe(expectedLabel)
    })
  })
})
