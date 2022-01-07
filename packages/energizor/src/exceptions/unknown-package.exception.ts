import { Identifier } from "../types"
import { EnergizorException } from "./energizor.exception"

export class UnknownPackageException extends EnergizorException {
  public constructor(arg: string) {
    super(`Failed to find a package for: ${arg}`)
  }
}
