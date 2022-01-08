import { Energizor } from '../energizor'
import { MockedLogger } from './mocked-logger'
import { CanNotRebindUnknownDependencyException } from '../exceptions/can-not-rebind-unknown-dependency.exception'
import { Utils } from '../utils'
import { AbstractPckg } from '../packages/abstract-pckg'
import {
  ICollection,
  ILogger,
  Constructor,
  DepOrToken,
  IRebind,
  DependencyConstr,
} from '../types'

export class TestableEnergizor extends Energizor implements IRebind {
  public constructor(
    collections: Constructor<ICollection>[] = [],
    logger: ILogger = new MockedLogger()
  ) {
    super(logger)

    this.collections = collections
  }

  public rebind<T>(depOrToken: DepOrToken<T>, constr: unknown) {
    const registry = this.getRegistry()
    const pckg = registry.get(depOrToken)

    if (!pckg) {
      throw new CanNotRebindUnknownDependencyException(depOrToken)
    }

    this.flagByConstructorProp(pckg, constr)

    registry.set(depOrToken, pckg)
  }

  private flagByConstructorProp(pckg: AbstractPckg, constr: unknown) {
    const isConstructor = Utils.isConstructor(constr)

    if (!isConstructor) {
      pckg.getDependency().flagAsConstantValue(constr)
      return
    }

    pckg.getDependency().setConstructor(constr as DependencyConstr)
  }
}
