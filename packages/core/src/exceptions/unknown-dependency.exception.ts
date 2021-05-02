import { Exception } from './exception.factory'

export class UnknownDependencyException extends Exception() {
  constructor(dependencyName: string) {
    super()
    this.message = `The dependency {{ ${dependencyName} }} does not exist in the container.`
  }
}
