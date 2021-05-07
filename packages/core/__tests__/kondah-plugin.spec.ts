import { HelloPlugin } from '../utils/konda-plugin.utils'

describe('kondah plugin', () => {
  let plug: HelloPlugin

  beforeEach(() => {
    plug = new HelloPlugin({}, undefined!)
  })

  it('should be defined', () => {
    expect(plug).toBeDefined()
  })

  it('should have a name', () => {
    expect(plug.name).toBe('hello-plugin')
  })
})
