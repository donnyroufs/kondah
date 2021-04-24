declare module '@konda/core' {
  interface KondaContext {
    logRoutes: () => void
  }

  interface IAppConfig {
    'http-controller': {
      serveRoutes?: boolean
    }
  }
}

export {}
