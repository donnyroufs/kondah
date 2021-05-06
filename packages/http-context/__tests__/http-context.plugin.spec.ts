// @ts-nocheck

import { HttpContextPlugin } from '../src/http-context.plugin'

describe('http-context', () => {
  it('should be defined', () => {
    const plugin = new HttpContextPlugin({})

    expect(plugin).toBeDefined()
  })
})
