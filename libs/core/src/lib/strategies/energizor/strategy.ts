import { DependencyData } from '../../dependency-data'

export abstract class Strategy {
  abstract execute<T>(dep: DependencyData<T>, resolvedDeps: unknown[]): T
}
