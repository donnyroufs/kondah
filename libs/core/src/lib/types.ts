import { ServerAdapter } from './server-adapter'
import { Plugin } from './plugin'
import { IOC } from './ioc'

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface IAppConfig {}
export interface IKondaContext {
  server: Omit<ServerAdapter, 'run'>
  ioc: IOC
}

export type NewablePlugin = new (config: unknown) => Plugin

export interface IKondaOptions {
  server: ServerAdapter
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  config: IAppConfig
  plugins?: NewablePlugin[]
}

export type Constructor<T> = new (...args: unknown[]) => T
export type Scopes = 'transient' | 'singleton'
export type Identifier = string
export type Dependency<T = unknown> = Constructor<T>
export type PropOrFunction = string

export type HttpVerb =
  | 'get'
  | 'post'
  | 'delete'
  | 'put'
  | 'patch'
  | 'options'
  | 'head'

export interface RouteDefinition {
  path: string
  requestMethod: HttpVerb
  methodName: string
  // TODO: Add middlewaretype
  middleware?: unknown[]
}
