import { Label } from '../src/label'

describe('label', () => {
  test('adds an empty char to the front and back', () => {
    const rawLabel = 'label'
    const label = Label.create(rawLabel)
    const expectedLabel = ' LABEL '

    expect(label.value).toBe(expectedLabel)
  })

  test('label is always uppercased', () => {
    const rawLabel = 'label'
    const label = Label.create(rawLabel)
    const expectedLabel = ' LABEL '

    expect(label.value).toBe(expectedLabel)
  })

  test('makes sure it only has 1 empty character in front and back', () => {
    const rawLabel = 'label '
    const label = Label.create(rawLabel)
    const expectedLabel = ' LABEL '

    expect(label.value).toBe(expectedLabel)
  })
})
