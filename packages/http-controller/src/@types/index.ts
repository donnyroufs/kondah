declare module '@kondah/core' {
  interface AppContext {
    addControllers(apiPrefix?: string)
  }
  interface IAppConfig {
    'http-controller': {
      controllersPath: string[]
      catchExceptions: boolean
    }
  }
}

export {}
