import { EnergizorException } from "./energizor.exception"

export class BootContainerBeforeUsingException extends EnergizorException {
  public constructor() {
    super("You need to boot the container before using it.")
  }
}
