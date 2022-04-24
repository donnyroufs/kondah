import { ExpressHttpAdapter } from '../src/express-http.adapter'

describe('express.adapter', () => {
  test('is defined', () => {
    const adapter = new ExpressHttpAdapter()

    expect(adapter).toBeDefined()
  })
})
