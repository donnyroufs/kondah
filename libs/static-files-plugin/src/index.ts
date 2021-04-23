export * from './lib/static-files.plugin'
// export * from './lib/index'

declare module '@konda/core' {
  interface IKondaContext {
    fromStaticPlugin?: () => void
  }
}
