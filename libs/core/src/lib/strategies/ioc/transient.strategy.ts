import { DependencyData } from '../../dependency-data'
import { Strategy } from './strategy'

export const transientStrategy = new (class TransientStrategy extends Strategy {
  execute<T>(dep: DependencyData<T>, resolvedDeps: unknown[]) {
    return new dep.dependency(...resolvedDeps)
  }
})()
