import { DependencyData } from '../../dependency-data'
import { Strategy } from './strategy'

export const singletonStrategy = new (class extends Strategy {
  execute<T>(dep: DependencyData<T>, resolvedDeps: unknown[]) {
    if (dep.cache) {
      return dep.cache as T
    }

    const cachedDep = new dep.dependency(...resolvedDeps) as T
    dep.cache = cachedDep

    return cachedDep as T
  }
})()
