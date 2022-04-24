import { ExpressPlatform } from '../src/express.platform'

describe('ExpressPlatform', () => {
  test('is defined', () => {
    const platform = new ExpressPlatform({
      plugins: [],
    })

    expect(platform).toBeDefined()
  })
})
