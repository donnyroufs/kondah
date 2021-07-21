import express = require('express')

import { KondahPlugin } from './kondah-plugin'
import { Energizor } from './energizor'
import { DependencyData } from './dependency-data'
import { KondahServer } from './kondah-server'
import { AppContext } from './contexts'
import { KondahLibrary } from './kondah-library'

export interface IAppConfig {}
export type Middleware = express.RequestHandler

export interface IAppContext {
  server: KondahServer
  energizor: Energizor
  logger: ILogger
}

export type NewablePlugin = new (
  _config: IAppConfig,
  appContext: AppContext
) => KondahPlugin

export interface IKondaOptions {
  mode?: 'boot' | 'no-boot'
  logger?: ILogger
  plugins?: NewablePlugin[]
  config: IAppConfig
  disableServer?: boolean
  libraries: NewableKondahLibrary[]
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
  info(msg: string, label?: string): void
  success(msg: string, label?: string): void
  warning(msg: string, label?: string): void
  error(msg: string, label?: string): void
}

export type ServerRunFn = (port: number) => void

export type ErrorMiddlewareFn = (
  err: Error,
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => void

export interface IKondahRequestData {}

export interface IConfigureServices {
  configureServices(services: Energizor): void
}

export interface IHandler {
  install(appContext: AppContext): Promise<void> | void
}

export type NewableKondahLibrary = Constructor<KondahLibrary>
