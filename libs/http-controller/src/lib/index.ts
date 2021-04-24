declare module '@konda/core' {
  interface KondaContext {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    fromHttpController: any
  }

  interface IAppConfig {
    'http-controller': {
      enable: boolean
    }
  }
}

export {}
