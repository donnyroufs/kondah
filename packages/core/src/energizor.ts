import { DependencyData } from './dependency-data'
import { singletonStrategy, transientStrategy } from './strategies/energizor'
import {
  Dependency,
  IEnergizorRegisterOptions,
  IStrategy,
  Scopes,
  Token,
} from './types'
import { MetaTypes } from './metadata.types'
import { Utils } from './utils'
import { UnknownDependencyException } from './exceptions/unknown-dependency.exception'
import { EnergizorParser } from './energizor.parser'
import { AppContext } from './contexts'

export class Energizor {
  private readonly _parser: EnergizorParser = new EnergizorParser()
  private _appContext: AppContext
  private _dependencies: Map<Token, DependencyData<unknown>> = new Map()
  private _defaultScope: Scopes = 'transient'
  private _strategies: Record<Scopes, IStrategy> = {
    singleton: singletonStrategy,
    transient: transientStrategy,
  }

  constructor(context: AppContext) {
    this._appContext = context
  }

  public register<T>(
    dep: Dependency<T> | Token,
    options?: IEnergizorRegisterOptions<T>
  ) {
    const _scope = options?.scope ? options.scope : this._defaultScope
    const token = this.isInversionOfControl(dep) ? dep : dep.name
    const parsedToken = this.getParsedToken(dep)

    const isInversionOfControl = this.isInversionOfControl(dep)

    try {
      if (isInversionOfControl && options?.asClass) {
        this.addDependency<T>(options.asClass, _scope, token)
        return this._appContext.logger.success(
          `${parsedToken} has been registered`
        )
      }

      if (isInversionOfControl && !options?.asClass) {
        return this._appContext.logger.error(
          `${parsedToken} failed to register: missing value for 'asClass' property`
        )
      }

      this.addDependency<T>(dep as Dependency<T>, _scope, token)

      return this._appContext.logger.success(
        `${(dep as Dependency<T>).name} has been registered`
      )
    } catch (err) {
      if (err.message.includes('map')) {
        return this._appContext.logger.error(
          `${parsedToken} failed to register: missing @Injectable decorator`
        )
      }

      return this._appContext.logger.error(`${parsedToken} failed to register`)
    }
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
      throw new UnknownDependencyException(this.getParsedToken(_identifier))

    const resolvedDeps = this.resolveDependencies(dep)

    return this._strategies[dep.scope].execute(dep, resolvedDeps) as T
  }

  private resolveDependencies(dep: DependencyData<unknown>) {
    if (!dep.injectables || dep.injectables.length <= 0) return []

    return dep.injectables.map(this.get.bind(this))
  }

  private getInjectables<T>(dep: Dependency<T>) {
    return Reflect.get(dep, MetaTypes.injectables)
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

  private getIdentifier(identifier: Token | Dependency) {
    return typeof identifier === 'string' || typeof identifier === 'symbol'
      ? identifier
      : identifier.name
  }

  private isInversionOfControl<T>(dep: Dependency<T> | Token): dep is Token {
    return typeof dep === 'string' || typeof dep === 'symbol'
  }

  private getParsedToken<T>(dep: Dependency<T> | Token) {
    const isToken = this.isToken(dep)
    const stringifiedDep = this._parser.depOrTokenToString(dep)

    if (isToken && stringifiedDep.includes('(')) {
      return this._parser.getNameFromSymbol(stringifiedDep)
    }

    if (stringifiedDep.includes('class')) {
      return this._parser.getNameFromClassLikeString(stringifiedDep)
    }

    return stringifiedDep
  }

  private isToken<T>(dep: Dependency<T> | Token) {
    return ['string', 'symbol'].some((type) => (typeof dep).includes(type))
  }
}

// Gets dirty added in Kondah
export const energizor = new Energizor(undefined!)
