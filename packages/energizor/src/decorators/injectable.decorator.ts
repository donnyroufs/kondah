import { ClsArgument } from "../cls-argument"
import { EnergizorException } from "../exceptions/energizor.exception"
import { MissingInvertedDependencyException } from "../exceptions/missing-inverted-dependency.exception"
import { MetadataKey } from "../metadata.enum"
import { ClsArgumentOrInverted, DependencyConstr } from "../types"
import { Utils } from "../utils"

export function Injectable(): ClassDecorator {
  return (target: any) => {
    const rawArgs = Reflect.getMetadata("design:paramtypes", target) || []
    const args = rawArgs.map(
      (arg: DependencyConstr) => new ClsArgument(arg, arg)
    )
    const currentArgs = Utils.getMetadata<ClsArgumentOrInverted>(
      MetadataKey.args,
      target
    )

    const enhancedInjectables = args.map((arg: ClsArgument, index: number) => {
      const isInverted = arg.target.toString().includes("Object()")

      if (!isInverted) {
        return arg.target
      }

      const invertedDependency = currentArgs.find((inverted: any) => {
        return inverted.index === index
      })

      if (!invertedDependency) {
        throw new MissingInvertedDependencyException()
      }

      return invertedDependency?.token
    })

    Utils.mergeAndSetMetadata(MetadataKey.args, target, enhancedInjectables)
  }
}
