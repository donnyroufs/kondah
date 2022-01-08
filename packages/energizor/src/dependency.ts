import { MetadataKey } from './metadata.enum'
import { DependencyConstr, Identifier } from './types'
import { Utils } from './utils'

export class Dependency<T = unknown> {
  private _constantValue: any = null

  public constructor(
    private readonly _identifier: Identifier,
    private _constructor: DependencyConstr<T>
  ) {}

  /**
   * @description gives you the identifier needed for the Registry to get the right package.
   */
  public getIdentifier() {
    return this._identifier
  }

  public setConstructor(constr: DependencyConstr<T>) {
    this._constructor = constr
  }

  public getConstantValue() {
    return this._constantValue
  }

  public isConstantValue(): boolean {
    return this._constantValue != null
  }

  public flagAsConstantValue(value: unknown) {
    this._constantValue = value
  }

  /**
   * @description gives you the unresolved constructor
   */
  public getConstructor() {
    return this._constructor
  }

  /**
   * @description gives you the class arguments that got added by the Injectable and Inject decorators
   */
  public getArguments() {
    return Utils.getMetadata<Identifier>(MetadataKey.args, this._constructor)
  }

  /**
   * @description checks whether the dependency has a onBoot hook.
   */
  public hasBootMethod(): boolean {
    return this.getConstructor().prototype.onBoot != null
  }
}
