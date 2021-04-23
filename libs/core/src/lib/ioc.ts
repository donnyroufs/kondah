import { Dependency, Identifier, Scopes } from './types'

export class DependencyData<T> {
  public injectables: Dependency[]

  constructor(
    public scope: Scopes,
    public dependency: Dependency<T>,
    injectables: Dependency[],
    public cache: null | Dependency<T> = null
  ) {
    this.injectables = injectables
  }
}

export class IOC {
  private _dependencies: Map<string, DependencyData<unknown>> = new Map()
  private _defaultScope: Scopes = 'singleton'

  public register<T>(dep: Dependency<T>, scope?: Scopes) {
    const _scope = scope ? scope : this._defaultScope
    const injectables = this.getInjectables<T>(dep)

    this._dependencies.set(
      dep.name,
      new DependencyData<T>(_scope, dep, injectables)
    )
  }

  // public rebind(identifier: Identifier) {}

  public setDefaultScope(scope: Scopes) {
    this._defaultScope = scope
  }

  public get<T>(identifier: Identifier) {
    const dep = this._dependencies.get(identifier)

    if (!dep) throw new Error('dependency does not exist in the container')

    if (dep.scope === 'singleton' && !dep.cache) {
      // console.log(this._dependencies)
      // console.log(dep.injectables)
      // let inj
      // if (dep.injectables) {
      //   // @ts-expect-error yes
      //   inj = this.get(dep.injectables[0].name)
      // }

      const resolvedDeps =
        dep.injectables?.length > 0
          ? dep.injectables.map((dep) => this.get(dep.name))
          : []

      const cachedDep = new dep.dependency(...resolvedDeps) as Dependency<T>
      dep.cache = cachedDep
      return dep.cache as Dependency<T>
    }

    return new dep.dependency() as Dependency<T>
  }

  // Resolve dependency
  private resolve() {
    return 1
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
