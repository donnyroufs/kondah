declare module '@konda/core' {
  interface KondaContext {
    fromStaticPlugin: () => void
  }

  interface IAppConfig {
    'static-plugin': {
      enabled: boolean
    }
  }
}

export {}
