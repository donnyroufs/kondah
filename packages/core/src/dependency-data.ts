import { Dependency, Scopes, Token } from './types'

export class DependencyData<T> {
  public injectables: Dependency[]

  constructor(
    public scope: Scopes,
    /**
     * used to get the dependency. Could be either the constructor name,
     * or a custom token (string, symbol)
     */
    public token: Token,
    public dependency: Dependency<T>,
    injectables: Dependency[],
    public cache: null | T = null
  ) {
    this.injectables = injectables
  }
}
