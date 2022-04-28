import { ClsArgument, InvertedClsArgument } from './cls-argument'
import { AbstractPckg } from './packages/abstract-pckg'

export type Constructor<T = unknown> = new (...args: any[]) => T

export type DependencyConstr<T = unknown> = Constructor<T>
export type Token = string | symbol
export type Identifier = DependencyConstr | Token
export type DepOrToken<T = unknown> = DependencyConstr<T> | Token
export type ClsArgumentOrInverted = ClsArgument | InvertedClsArgument
export interface IBootablePckg extends IBoot, AbstractPckg {}

export interface IBoot {
  onBoot(): void | Promise<void>
}

export type ExcludeHooks<T> = {
  [P in Exclude<keyof T, `on${string}`>]: T[P]
}

export interface ILogger {
  info(msg: string): void
  warning(msg: string): void
  success(msg: string): void
  danger(msg: string): void
}

export enum Package {
  TRANSIENT = 'transient',
  SINGLETON = 'singleton',
  CONSTANT = 'constant',
  FACTORY = 'factory',
}

export interface ICollection {
  configureServices(services: IEnergizor): void
}

export interface IRebind {
  rebind<T>(
    depOrToken: DepOrToken<T>,
    constr: DependencyConstr<T>,
    type: Package
  ): void
}

export interface IEnergizor {
  get<T>(depOrToken: DepOrToken<T>): ExcludeHooks<T>

  addTransient<T>(dependency: DependencyConstr<T>): void
  addTransient<T>(token: Token, dependency: DependencyConstr<T>): void
  addTransient<T>(
    depOrToken: DepOrToken<T>,
    dependency?: DependencyConstr<T>
  ): void

  addSingleton<T>(dependency: DependencyConstr<T>): void
  addSingleton<T>(token: Token, dependency: DependencyConstr<T>): void
  addSingleton<T>(
    depOrToken: DepOrToken<T>,
    dependency?: DependencyConstr<T>
  ): void

  addConstantValue(token: Token, value: any): void
  addFactory(token: Token, value: DependencyConstr | Function): void

  addCollection(collection: Constructor<ICollection>): void
}
