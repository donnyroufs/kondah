import { Registry } from '../registry'
import { AbstractPckg } from './abstract-pckg'

export class ConstantPckg extends AbstractPckg {
  public getValue(registry: Registry) {
    return this.getResolvedDependency(registry)
  }
}
