import { Registry } from '../registry'
import { DependencyConstr } from '../types'
import { AbstractPckg } from './abstract-pckg'

export class SingletonPckg extends AbstractPckg {
  private _cache: DependencyConstr | null = null

  public getValue(registry: Registry): DependencyConstr {
    if (!this._cache) {
      this._cache = this.getResolvedDependency(registry)
    }

    return this._cache
  }
}
