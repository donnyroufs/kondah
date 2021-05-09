import { Controller } from '../metadata.store'

declare module '@kondah/core' {
  interface AppContext {
    addControllers()
  }
  interface IAppConfig {
    'http-controller': {
      controllersPath: string[]
      catchExceptions: boolean
    }
  }
}

export {}
