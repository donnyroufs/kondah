import 'reflect-metadata'

import { Registry } from './registry'
import { Logger } from './logger'
import { PckgFactory } from './pckg.factory'
import { Utils } from './utils'
import { Dependency } from './dependency'
import { BootContainerBeforeUsingException } from './exceptions/boot-container-before-using.exception'
import { UnknownDependencyException } from './exceptions/unknown-dependency.exception'
import { CollectionAlreadyExistsException } from './exceptions/collection-already-exists.exception'
import { cast } from './cast.util'
import {
  Constructor,
  DepOrToken,
  IBootablePckg,
  IEnergizor,
  ILogger,
  ICollection,
  DependencyConstr,
  ExcludeHooks,
  Package,
  Token,
} from './types'

export class Energizor implements IEnergizor {
  private readonly _registry = new Registry()
  private readonly _pckgFactory = new PckgFactory()
  private readonly _logger: ILogger

  private _booted = false

  protected collections: Constructor<ICollection>[] = []

  public constructor(logger?: ILogger) {
    this._logger = logger || new Logger()
  }

  public async boot() {
    this.configureCollections()

    const pckgs = this._registry.getBootablePckgs()

    for (const pckg of pckgs) {
      const value = cast<IBootablePckg>(pckg.getValue(this._registry))
      await value.onBoot()
    }

    this._booted = true
    this._logger.info(`Energizor successfuly booted. (${pckgs.length})`)
  }

  private configureCollections() {
    this.collections.forEach((collection) =>
      new collection().configureServices(this)
    )
  }

  public get<T>(depOrToken: DepOrToken<T>): ExcludeHooks<T> {
    if (!this._booted) {
      throw new BootContainerBeforeUsingException()
    }

    const pckg = this._registry.get(depOrToken)

    if (!pckg) {
      throw new UnknownDependencyException()
    }

    return cast<ExcludeHooks<T>>(pckg.getValue(this._registry))
  }

  public addTransient<T>(dependency: DependencyConstr<T>): void
  public addTransient<T>(token: Token, dependency: DependencyConstr<T>): void
  public addTransient<T>(
    depOrToken: DepOrToken<T>,
    dependency?: DependencyConstr<T>
  ): void {
    this.register(Package.TRANSIENT, depOrToken, dependency)
  }

  public addSingleton<T>(dependency: DependencyConstr<T>): void
  public addSingleton<T>(token: Token, dependency: DependencyConstr<T>): void
  public addSingleton<T>(
    depOrToken: DepOrToken<T>,
    dependency?: DependencyConstr<T>
  ): void {
    this.register(Package.SINGLETON, depOrToken, dependency)
  }

  /**
   * In order to keep boundaries in your application you can add dependencies
   * that have been configured with the interface ICollection.
   */
  public addCollection(collection: Constructor<ICollection>) {
    const alreadyExists = this.collections.some((col) => col === collection)

    if (alreadyExists) {
      throw new CollectionAlreadyExistsException()
    }

    this.collections.push(collection)
  }

  protected register<T>(
    type: Package,
    depOrToken: DepOrToken<T>,
    constr?: DependencyConstr<T>
  ) {
    const isInverted = !!(constr && !Utils.isConstructor(depOrToken))

    const dependencyConstructor = isInverted
      ? constr
      : (depOrToken as DependencyConstr)

    const dependency = new Dependency(depOrToken, dependencyConstructor!)

    const pckg = this._pckgFactory.makePckg(type, dependency)

    this._registry.set(depOrToken, pckg)
  }

  protected getRegistry(): Registry {
    return this._registry
  }
}
