/* eslint-disable @typescript-eslint/no-namespace */

import express = require('express')
import { IKondahRequestData } from './types'

export * from './kondah'
export * from './types'
export * from './kondah-plugin'
export * from './decorators'
export * from './metadata.types'
export * from './utils'
export * from './logger'
export * from './kondah-library'

export { AppContext } from './contexts'

export type { Energizor } from './energizor'

declare global {
  namespace Express {
    interface Request {
      kondah: IKondahRequestData
    }
  }
}
