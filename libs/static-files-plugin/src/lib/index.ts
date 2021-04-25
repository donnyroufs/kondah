declare module '@konda/core' {
  interface AppContext {
    fromStaticPlugin: () => void
  }

  interface IAppConfig {
    'static-files': {
      path?: string
    }
  }
}

export {}
