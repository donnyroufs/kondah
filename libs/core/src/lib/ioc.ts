import { DependencyData } from './dependency-data'
import { singletonStrategy, transientStrategy } from './strategies/ioc'
import { Strategy } from './strategies/ioc/strategy'
import { Dependency, Identifier, Scopes } from './types'

export class IOC {
  private _dependencies: Map<string, DependencyData<unknown>> = new Map()
  private _defaultScope: Scopes = 'transient'
  private _strategies: Record<Scopes, Strategy> = {
    singleton: singletonStrategy,
    transient: transientStrategy,
  }

  public register<T>(dep: Dependency<T>, scope?: Scopes) {
    const _scope = scope ? scope : this._defaultScope
    const injectables = this.getInjectables<T>(dep)

    this._dependencies.set(
      dep.name,
      new DependencyData<T>(_scope, dep, injectables)
    )
  }

  // public rebind(identifier: Identifier) {}

  /**
   *
   * @param scope defaults to Transient
   *
   */
  public setDefaultScope(scope: Scopes) {
    this._defaultScope = scope
  }

  public get<T>(identifier: Identifier | Dependency<T>) {
    const _identifier =
      typeof identifier === 'string' ? identifier : identifier.name

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
    return !!dep.prototype.__injectables__
  }

  private getInjectables<T>(dep: Dependency<T>) {
    const injectables = this.hasInjectables(dep)
    return injectables ? dep.prototype.__injectables__ : null
  }
}

export const ioc = new IOC()
