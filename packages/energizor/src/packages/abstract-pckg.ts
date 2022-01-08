import { Dependency } from '../dependency'
import { UnknownPackageException } from '../exceptions/unknown-package.exception'
import { Registry } from '../registry'
import { DependencyConstr } from '../types'

export abstract class AbstractPckg {
  public constructor(protected readonly dependency: Dependency) {}

  public abstract getValue(registry: Registry): DependencyConstr

  public getDependency() {
    return this.dependency
  }

  protected getResolvedDependency(registry: Registry) {
    if (this.dependency.isConstantValue()) {
      return this.dependency.getConstantValue()
    }

    const constr = this.dependency.getConstructor()
    const args = this.dependency.getArguments()

    const resolvedArgs = args.map((arg) => {
      const pckg = registry.get(arg)

      if (!pckg) {
        throw new UnknownPackageException(arg.toString())
      }

      return pckg.getValue(registry)
    })

    return new constr(...resolvedArgs) as DependencyConstr
  }
}
