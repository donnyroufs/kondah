declare module '@konda/core' {
  interface KondaContext {
    fromStaticPlugin: () => void
  }

  interface IAppConfig {
    'static-files': {
      path?: string
    }
  }
}

export {}
