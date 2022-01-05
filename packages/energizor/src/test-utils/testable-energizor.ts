import { Energizor } from "../energizor"
import { MockedLogger } from "./mocked-logger"
import {
  ICollection,
  ILogger,
  Constructor,
  DependencyConstr,
  DepOrToken,
  IRebind,
  Package,
} from "../types"

export class TestableEnergizor extends Energizor implements IRebind {
  public constructor(
    collections: Constructor<ICollection>[] = [],
    logger: ILogger = new MockedLogger()
  ) {
    super(logger)

    this.collections = collections
  }

  public rebind<T>(
    depOrToken: DepOrToken<T>,
    constr: DependencyConstr<T>,
    type: Package = Package.SINGLETON
  ) {
    this.register(type, depOrToken, constr)
  }
}
