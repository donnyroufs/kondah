import { ServerAdapter } from './server-adapter'
import { Plugin } from './plugin'
import { Energizor } from './energizor'

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface IAppConfig {}
export interface IAppContext {
  server: Omit<ServerAdapter, 'run'>
  energizor: Energizor
}

export type NewablePlugin = new (config: unknown) => Plugin

export interface IKondaOptions {
  server: ServerAdapter
  config: IAppConfig
  plugins?: NewablePlugin[]
}

export type Constructor<T> = new (...args: unknown[]) => T
export type Scopes = 'transient' | 'singleton'
export type Identifier = string
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
