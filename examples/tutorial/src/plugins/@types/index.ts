declare module '@kondah/core' {
  interface AppContext {
    hi(): void
  }

  // This was not part of the tutorial
  // but you can also extend the app config from here.
  // interface IAppConfig {}
}

export {}
