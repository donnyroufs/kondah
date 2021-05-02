import { ILogger } from '../src'
import { Inject, Injectable } from '../src/index'

export const types = {
  userService: Symbol('userService'),
  childTwoService: Symbol('childTwoService'),
  innerChild: Symbol('innerChild'),
}

export class Logger implements ILogger {
  info(msg: string) {
    return msg
  }

  success(msg: string) {
    return msg
  }

  warning(msg: string) {
    return msg
  }

  error(msg: string) {
    return msg
  }
}

@Injectable()
export class InnerChildService {
  public value = 1
}

@Injectable()
export class ChildService {
  constructor(
    public readonly innerChild: InnerChildService,
    @Inject(types.innerChild) public readonly innerIocChild: any
  ) {}
}

@Injectable()
export class IocWithClassType {
  constructor(@Inject(types.userService) public readonly UserService) {}
}

@Injectable()
export class UserService {
  constructor(
    public readonly child: ChildService,
    @Inject(types.childTwoService) public readonly childTwo: any
  ) {}
}

@Injectable()
export class ChildTwoService {}

@Injectable()
class Woef {}

@Injectable()
export class MissingDepService {
  constructor(private readonly woef: Woef) {}
}

@Injectable()
export class PureService {
  public value = 1
}

export class UndecoratedService {}
