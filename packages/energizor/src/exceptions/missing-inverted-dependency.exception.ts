import { EnergizorException } from "./energizor.exception"

export class MissingInvertedDependencyException extends EnergizorException {
  public constructor() {
    super("Missing inverted dependency.")
  }
}
