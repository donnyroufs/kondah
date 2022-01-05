import { EnergizorException } from "./energizor.exception"

export class CollectionAlreadyExistsException extends EnergizorException {
  public constructor() {
    super("You tried to register a collection that already exists.")
  }
}
