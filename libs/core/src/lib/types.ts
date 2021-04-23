import { ServerAdapter } from './server-adapter'
import { Plugin } from './plugin'
import { IOC as _IOC } from './ioc'

export interface IKondaContext {
  server: Omit<ServerAdapter, 'run'>
  ioc: IOC
}

export interface IKondaOptions {
  server: ServerAdapter
  plugins?: Plugin[]
}

export type IOC = _IOC

export type Constructor<T> = new (...args: unknown[]) => T
export type Scopes = 'transient' | 'singleton'
export type Identifier = string
export type Dependency<T = unknown> = Constructor<T>

export type PropOrFunction = string
