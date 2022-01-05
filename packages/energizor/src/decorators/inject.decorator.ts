import { InvertedClsArgument } from "../cls-argument"
import { MetadataKey } from "../metadata.enum"
import { Token } from "../types"
import { Utils } from "../utils"

export function Inject<T>(token: Token): ParameterDecorator {
  return (target: any, _, index) => {
    if (typeof index != "number") return

    const data = new InvertedClsArgument(target, token, index)
    Utils.mergeAndSetMetadata(MetadataKey.args, target, [data])
  }
}
