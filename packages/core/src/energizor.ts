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
    const token = this.isInversionOfControl(dep) ? dep : dep.name

    try {
      if (this.isInversionOfControl(dep) && options && options.asClass) {
        this.addDependency<T>(options.asClass, _scope, token)
        Logger.successRegister(dep.toString())
        return
      }

      this.addDependency<T>(dep as Dependency<T>, _scope, token)
      Logger.successRegister((dep as Dependency<T>).name)
    } catch (err) {
      Logger.failedRegister(token.toString())
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

  private addDependency<T>(dep: Dependency<T>, scope: Scopes, token: Token) {
    let injectables = this.getInjectables<T>(dep)
    const parameters = Reflect.getMetadata(MetaTypes.parameters, dep)

    injectables = injectables.map((injectable, index) => {
      const isInterface = injectable.toString().includes('Object()')

      const _token = isInterface
        ? parameters.find((parameter) => parameter.index === index).identifier
        : null

      return isInterface ? _token : injectable
    })

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
}

export const energizor = new Energizor()
