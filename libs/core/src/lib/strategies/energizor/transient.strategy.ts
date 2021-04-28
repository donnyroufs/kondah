import { DependencyData } from '../../dependency-data'
import { IStrategy } from '../../types'

export const transientStrategy = new (class TransientStrategy
  implements IStrategy {
  execute<T>(dep: DependencyData<T>, resolvedDeps: unknown[]) {
    return new dep.dependency(...resolvedDeps)
  }
})()
