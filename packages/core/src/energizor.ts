import { DependencyData } from './dependency-data'
import { singletonStrategy, transientStrategy } from './strategies/energizor'
import {
  Dependency,
  Identifier,
  IEnergizorBindingOptions,
  IStrategy,
  Scopes,
  Token,
} from './types'
import { MetaTypes } from './metadata.types'
import { Logger } from './logger'

export class Energizor {
  private _dependencies: Map<Token, DependencyData<unknown>> = new Map()
  private _defaultScope: Scopes = 'transient'
  private _strategies: Record<Scopes, IStrategy> = {
    singleton: singletonStrategy,
    transient: transientStrategy,
  }

  public register<T>(
    dep: Dependency<T> | Token,
    options?: IEnergizorBindingOptions<T>
  ) {
    const _scope = options?.scope ? options.scope : this._defaultScope

    // TODO: Refactor, perhaps 2 different handlers.
    // 1. handles dependency injection
    // 2. handles inversion of control
    // or, use strategies (gotta love m right!)
    if (this.isInversionOfControl<T>(dep, options)) {
      if (!options || !options.to) return

      try {
        this.addIOCDependency(dep, options.to, _scope)
        Logger.successRegister(dep.toString())
      } catch (err) {
        Logger.failedRegister(dep.toString())
      }
      return
    }

    try {
      this.addDependency<T>(dep, _scope)
      Logger.successRegister(dep.name)
    } catch (err) {
      Logger.failedRegister(dep.name)
    }
  }

  public rebind<T>(
    identifier: Identifier | Dependency<T>,
    newDependency: Dependency<T>,
    scope?: Scopes
  ) {
    const _scope = scope ? scope : this._defaultScope
    this.addDependency<T>(newDependency, _scope)

    const _identifier = this.getIdentifier(identifier)
    this._dependencies[_identifier] = newDependency
  }

  /**
   *
   * @param scope defaults to Transient
   *
   */
  public setDefaultScope(scope: Scopes) {
    this._defaultScope = scope
  }

  public get<T>(identifier: Token | Dependency<T>): T {
    const _identifier = this.getIdentifier(identifier)

    const dep = this._dependencies.get(_identifier)

    if (!dep) throw new Error('dependency does not exist in the container')

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

  private addDependency<T>(dep: Dependency<T>, scope: Scopes) {
    let injectables = this.getInjectables<T>(dep)
    const parameters = Reflect.getMetadata(MetaTypes.parameters, dep)

    injectables = injectables.map((injectable, index) => {
      const isInterface = injectable.toString().includes('Object()')

      const token = isInterface
        ? parameters.find((parameter) => parameter.index === index).identifier
        : null

      return isInterface ? token : injectable
    })

    this._dependencies.set(
      dep.name,
      new DependencyData<T>(scope, dep.name, dep, injectables)
    )
  }

  private addIOCDependency<T>(token: Token, dep: Dependency<T>, scope: Scopes) {
    const injectables = this.getInjectables<T>(dep)

    this._dependencies.set(
      token,
      new DependencyData<T>(scope, token, dep, injectables)
    )
  }

  private getIdentifier(identifier: Identifier | Dependency) {
    return typeof identifier === 'string' || typeof identifier === 'symbol'
      ? identifier
      : identifier.name
  }

  private isInversionOfControl<T>(
    dep: Dependency<T> | Token,
    options?: IEnergizorBindingOptions<T>
  ): dep is Token {
    return typeof dep === 'string' || typeof dep === 'symbol' || !!options?.to
  }
}

export const energizor = new Energizor()
