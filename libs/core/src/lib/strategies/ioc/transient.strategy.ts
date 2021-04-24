import { DependencyData } from '../../dependency-data'
import { Strategy } from './strategy'

class TransientStrategy extends Strategy {
  execute<T>(dep: DependencyData<T>, resolvedDeps: unknown[]) {
    return new dep.dependency(...resolvedDeps)
  }
}

export const transientStrategy = new TransientStrategy()
