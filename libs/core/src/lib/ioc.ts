export type Scopes = 'transient' | 'singleton';
export type Identifier = string;
export type Dependency<T = any> = new (...args: any[]) => T;

export class DependencyData<T> {
  public injectables: Identifier[];

  constructor(
    public scope: Scopes,
    public dependency: Dependency<T>,
    injectables: Identifier[],
    public cache: null | Dependency<T> = null
  ) {
    this.injectables = injectables;
  }
}

export class IOC {
  private _dependencies: Map<string, DependencyData<unknown>> = new Map();
  private _defaultScope: Scopes = 'transient';

  public register<T>(dep: Dependency<T>, scope?: Scopes) {
    const _scope = scope ? scope : this._defaultScope;
    this._dependencies.set(dep.name, new DependencyData<T>(_scope, dep, []));
  }

  public rebind(identifier: string) {}

  public setDefaultScope(scope: Scopes) {
    this._defaultScope = scope;
  }

  public get<T>(identifier: Identifier) {
    const dep = this._dependencies.get(identifier);
    if (dep?.scope === 'singleton' && !dep.cache) {
      const cachedDep = new dep.dependency() as any;
      dep.cache = cachedDep;
      return dep.cache;
    }

    if (dep?.scope === 'singleton') {
      return dep.cache;
    }

    if (dep?.scope === 'transient') {
      return new dep.dependency();
    }
  }

  private injectDependencies() {}
}

/*
  const ioc = new IOC();
  ioc.register<IFancyService>(Types.fancyService).singleton(FancyService).in('core')

  ioc.get(Types.fancyService)
  ioc.rebind(Types.fancyService).singleton(FancyFancyService)
*/
