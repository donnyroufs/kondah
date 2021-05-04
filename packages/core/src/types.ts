import { ServerAdapter } from './server-adapter'
import { Plugin } from './plugin'
import { Energizor } from './energizor'
import { DependencyData } from './dependency-data'

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface IAppConfig {}

export interface IAppContext {
  server: ServerAdapter
  energizor: Energizor
}

export type NewablePlugin = new (_config: IAppConfig) => Plugin

export interface IKondaOptions {
  server: ServerAdapter
  config: IAppConfig
  plugins?: NewablePlugin[]
}

export type Constructor<T> = new (...args: any[]) => T
export type Scopes = 'transient' | 'singleton'
export type Identifier = Token
export type Dependency<T = unknown> = Constructor<T>
export type PropOrFunction = string | (() => unknown)

export type HttpVerb =
  | 'get'
  | 'post'
  | 'delete'
  | 'put'
  | 'patch'
  | 'options'
  | 'head'

// Small hack to extend a interface rather than implementing
// because plugins can augment the `IKodaContext` interface
// making `KodaContext` invalid since it does not implement
// the augmented interface
export type PartialAppContext = Partial<IAppContext>

export interface IStrategy {
  execute<T>(dep: DependencyData<T>, resolvedDeps: any[]): T
}

export type Token = string | symbol

export interface IEnergizorRegisterOptions<T> {
  asClass?: Dependency<T>
  scope?: Scopes
}

export interface ILogger {
  info(msg: string): void
  success(msg: string): void
  warning(msg: string): void
  error(msg: string): void
}