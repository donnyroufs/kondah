import { DepOrToken } from "./types"

export class ClsArgument {
  public constructor(
    public readonly target: any,
    public readonly token: DepOrToken
  ) {}
}

export class InvertedClsArgument extends ClsArgument {
  public constructor(
    target: any,
    token: DepOrToken,
    public readonly index: number
  ) {
    super(target, token)
  }
}
