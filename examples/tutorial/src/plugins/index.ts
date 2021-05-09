declare module '@kondah/core' {
  interface AppContext {
    hi(): void
  }

  interface IAppConfig {
    'welcome-plugin': {
      amount: number
    }
  }
}

export {}
