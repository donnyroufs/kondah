import { Dependency } from './dependency'
import { AbstractPckg } from './packages/abstract-pckg'
import { ConstantPckg } from './packages/constant-pckg'
import { FactoryPckg } from './packages/factory.pckg'
import { SingletonPckg } from './packages/singleton.pckg'
import { TransientPckg } from './packages/transient.pckg'
import { Package } from './types'

export class PckgFactory {
  public makePckg(type: Package, dependency: Dependency): AbstractPckg {
    if (type === Package.TRANSIENT) {
      return new TransientPckg(dependency)
    }

    if (type === Package.CONSTANT) {
      const pckg = new ConstantPckg(dependency)

      pckg.getDependency().flagAsConstantValue()

      return pckg
    }

    if (type === Package.FACTORY) {
      const pckg = new FactoryPckg(dependency)

      return pckg
    }

    return new SingletonPckg(dependency)
  }
}
