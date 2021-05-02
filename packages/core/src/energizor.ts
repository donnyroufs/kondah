import { DependencyData } from './dependency-data'
import { singletonStrategy, transientStrategy } from './strategies/energizor'
import {
  Dependency,
  Identifier,
  IEnergizorBindingOptions,
  ILogger,
  IStrategy,
  Scopes,
  Token,
} from './types'
import { MetaTypes } from './metadata.types'
import { Utils } from './utils'
import { UnknownDependencyException } from './exceptions/unknown-dependency.exception'
import { Logger } from './logger'

export class Energizor {
  private _logger: ILogger
  private _dependencies: Map<Token, DependencyData<unknown>> = new Map()
  private _defaultScope: Scopes = 'transient'
  private _strategies: Record<Scopes, IStrategy> = {
    singleton: singletonStrategy,
    transient: transientStrategy,
  }

  constructor(logger: ILogger) {
    this._logger = logger
  }

  // TODO: Refactor, it's not open closed principle
  public register<T>(
    dep: Dependency<T> | Token,
    options?: IEnergizorBindingOptions<T>
  ) {
    const _scope = options?.scope ? options.scope : this._defaultScope
    const token = this.isInversionOfControl(dep) ? dep : dep.name
    const dependencyName = this.depToReadAbleDependencyName(dep)

    try {
      if (this.isInversionOfControl(dep) && options && options.asClass) {
        this.addDependency<T>(options.asClass, _scope, token)
        return this._logger.success(`${dependencyName} has been registered`)
      }

      if (this.isInversionOfControl(dep) && options && !options.asClass) {
        return this._logger.error(
          `${dependencyName} failed to register: missing value for 'asClass' property`
        )
      }

      this.addDependency<T>(dep as Dependency<T>, _scope, token)
      return this._logger.success(
        `${(dep as Dependency<T>).name} has been registered`
      )
    } catch (err) {
      if (err.message.includes('map')) {
        return this._logger.error(
          `${dependencyName} failed to register: missing @Injectable decorator`
        )
      }

      return this._logger.error(`${dependencyName} failed to register`)
    }
  }

  public rebind() {
    throw new Error('this method is not yet implemented')
  }

  /**
   * @param scope defaults to Transient
   */
  public setDefaultScope(scope: Scopes) {
    this._defaultScope = scope
  }

  public get<T>(identifier: Token | Dependency<T>): T {
    const _identifier = this.getIdentifier(identifier)

    const dep = this._dependencies.get(_identifier)

    if (!dep)
      throw new UnknownDependencyException(
        this.depToReadAbleDependencyName(_identifier.toString())
      )

    const resolvedDeps = this.resolveDependencies(dep)

    return this._strategies[dep.scope].execute(dep, resolvedDeps) as T
  }

  private resolveDependencies(dep: DependencyData<unknown>) {
    if (!dep.injectables || dep.injectables.length <= 0) return []

    return dep.injectables.map(this.get.bind(this))
  }

  private hasInjectables<T>(dep: Dependency<T>) {
    return !!Reflect.has(dep, MetaTypes.injectables)
  }

  private getInjectables<T>(dep: Dependency<T>) {
    const injectables = this.hasInjectables(dep)
    return injectables ? Reflect.get(dep, MetaTypes.injectables) : null
  }

  private addDependency<T>(dep: Dependency<T>, scope: Scopes, token: Token) {
    const injectables = Utils.replaceInterfacesWithToken(
      this.getInjectables(dep),
      dep
    )

    this._dependencies.set(
      token,
      new DependencyData<T>(scope, dep.name, dep, injectables)
    )
  }

  private getIdentifier(identifier: Identifier | Dependency) {
    return typeof identifier === 'string' || typeof identifier === 'symbol'
      ? identifier
      : identifier.name
  }

  private isInversionOfControl<T>(dep: Dependency<T> | Token): dep is Token {
    return typeof dep === 'string' || typeof dep === 'symbol'
  }

  private depToReadAbleDependencyName<T>(dep: Dependency<T> | Token) {
    if (
      (typeof dep === 'string' && dep.toString().includes('(')) ||
      (typeof dep === 'symbol' && dep.toString().includes('('))
    ) {
      return dep.toString().split('(')[1].slice(0, -1)
    }

    if (dep.toString().includes('class')) {
      return dep.toString().split(' ')[1].trim()
    }

    return dep.toString()
  }
}

export const energizor = new Energizor(new Logger())
