/* eslint-disable @typescript-eslint/no-empty-function */

import { Logger } from '../src/logger'
import { App, CoolLogger } from '../utils/kondah.utils'

describe('kondah', () => {
  it('should be defined', () => {
    const app = new App({
      config: {},
    })

    expect(app).toBeDefined()
  })

  describe('when creating a kondah instance', () => {
    it('should use the official logger when none is provided', () => {
      const app = new App({
        config: {},
      })

      const _logger = app.getContext().logger

      expect(_logger).toBeInstanceOf(Logger)
    })

    it('should replace the current logger with a new one when provided', () => {
      const app = new App({
        logger: new CoolLogger(),
        config: {},
      })

      const _logger = app.getContext().logger

      expect(_logger).toBeInstanceOf(CoolLogger)
      expect(_logger.info('woef')).toEqual('woef')
    })
  })
})
