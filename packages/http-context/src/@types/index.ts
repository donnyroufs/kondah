declare module '@kondah/core' {
  interface AppContext {
    addToHttpContext<T>(key: string, fn: T): void
  }
}

export {}
