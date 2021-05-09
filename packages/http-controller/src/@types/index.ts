import { Controller } from '../metadata.store'

declare module '@kondah/core' {
  interface AppContext {
    addControllers(controllers?: Controller[])
  }
  interface IAppConfig {
    'http-controller': {
      controllersPath: string[]
      serveRoutes?: boolean
    }
  }
}

export {}
