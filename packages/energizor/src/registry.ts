import { AbstractPckg } from "./packages/abstract-pckg"
import { DependencyConstr, IBootablePckg, Identifier, Token } from "./types"

export class Registry {
  private readonly _data: Map<Identifier, AbstractPckg> = new Map()

  public get<T>(key: Token | DependencyConstr<T>) {
    const result = this._data.get(key)

    if (!result) {
      return null
    }

    return result
  }

  public set<T>(key: Token | DependencyConstr<T>, pckg: AbstractPckg) {
    this._data.set(key, pckg)
  }

  public getBootablePckgs(): IBootablePckg[] {
    return [...this._data.values()].filter((pckg) =>
      pckg.getDependency().hasBootMethod()
    ) as IBootablePckg[]
  }

  public hasBootablePckgs(): boolean {
    return this.getBootablePckgs().length > 0
  }
}
