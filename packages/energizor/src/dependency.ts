import { EnergizorException } from './exceptions/energizor.exception'
import { MetadataKey } from './metadata.enum'
import { DependencyConstr, Identifier } from './types'
import { Utils } from './utils'

export class Dependency<T = unknown> {
  private _isConstantValue = false

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
    if (!this.isConstantValue()) {
      throw new EnergizorException(
        'You tried to access a constant value but it is not a constant.'
      )
    }

    return this._constructor
  }

  public isConstantValue(): boolean {
    return this._isConstantValue
  }

  public flagAsConstantValue() {
    this._isConstantValue = true
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
    const args = Utils.getMetadata<Identifier>(
      MetadataKey.args,
      this._constructor
    )

    return Array.isArray(args) ? args : []
  }

  /**
   * @description checks whether the dependency has a onBoot hook.
   */
  public hasBootMethod(): boolean {
    if (this.isConstantValue()) {
      return false
    }

    return this.getConstructor()?.prototype?.onBoot != null
  }
}
