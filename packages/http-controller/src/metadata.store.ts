import { Constr } from './types'

export type Controller = new (...args: unknown[]) => unknown

export class MetadataStore {
  public static controllers: Array<Constr<Controller>> = []
}
