import { EnergizorException } from "./energizor.exception"

export class UnknownDependencyException extends EnergizorException {
  public constructor() {
    super("You asked for a dependency that does not exist.")
  }
}
