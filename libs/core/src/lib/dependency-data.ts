import { Dependency, Scopes } from './types'

export class DependencyData<T> {
  public injectables: Dependency[]

  constructor(
    public scope: Scopes,
    public dependency: Dependency<T>,
    injectables: Dependency[],
    public cache: null | T = null
  ) {
    this.injectables = injectables
  }
}
