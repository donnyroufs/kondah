import { Dependency, Token } from './types'

export class EnergizorParser {
  public getNameFromSymbol(stringifiedDep: string) {
    return stringifiedDep.toString().split('(')[1].slice(0, -1)
  }

  public getNameFromClassLikeString(stringifiedDep: string) {
    return stringifiedDep.toString().split(' ')[1].trim()
  }

  public depOrTokenToString<T>(dep: Dependency<T> | Token) {
    return dep.toString()
  }
}
