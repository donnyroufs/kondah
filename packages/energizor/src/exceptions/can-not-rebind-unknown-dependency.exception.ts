import { DepOrToken } from '../types'
import { EnergizorException } from './energizor.exception'

export class CanNotRebindUnknownDependencyException extends EnergizorException {
  public constructor(depOrToken: DepOrToken) {
    super(`Cannot rebind ${depOrToken.toString()} because it is unknown.`)
  }
}
