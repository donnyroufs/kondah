import { Registry } from "../registry"
import { AbstractPckg } from "./abstract-pckg"

export class TransientPckg extends AbstractPckg {
  public getValue(registry: Registry) {
    return this.getResolvedDependency(registry)
  }
}
