import { ClsArgument, InvertedClsArgument } from "./cls-argument"
import { Energizor } from "./energizor"
import { AbstractPckg } from "./packages/abstract-pckg"

export type Constructor<T = unknown> = new (...args: any[]) => T

export type DependencyConstr<T = unknown> = Constructor<T>
export type Token = string | symbol
export type Identifier = DependencyConstr | Token
export type DepOrToken<T = unknown> = DependencyConstr<T> | Token
export type ClsArgumentOrInverted = ClsArgument | InvertedClsArgument
export interface IBootablePckg extends IBoot, AbstractPckg {}

export interface IBoot {
  onBoot(logger: ILogger): void | Promise<void>
}

export type ExcludeHooks<T> = {
  [P in Exclude<keyof T, `on${string}`>]: T[P]
}

export interface ILogger {
  info(msg: string): void | string
  warning(msg: string): void | string
  success(msg: string): void | string
  danger(msg: string): void | string
}

export enum Package {
  TRANSIENT = "transient",
  SINGLETON = "singleton",
}

export interface ICollection {
  configureServices(services: ExcludeHooks<Energizor>): void
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

  addCollection(collection: Constructor<ICollection>): void
  boot(): Promise<void>
}
