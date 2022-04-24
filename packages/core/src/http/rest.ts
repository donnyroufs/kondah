import { HttpMethod } from './http-method.enum'

export class RouteData {
  constructor(
    public readonly path: string,
    public readonly method: HttpMethod,
    public readonly handler: any,
    public readonly target: { __endpoint__: string },
    public readonly methodParams?: any
  ) {}
}

export const controllers: Record<string, RouteData> = {}

export function Get(path: string) {
  return (target: any, key: string) => {
    const handler = target[key]

    controllers[target.constructor.name] = {
      ...controllers[target.constructor.name],
      handler,
      path,
      target,
      method: HttpMethod.GET,
    }
  }
}

export function Controller(pathName: string) {
  // eslint-disable-next-line @typescript-eslint/ban-types
  return (target: Function) => {
    target.prototype.__endpoint__ = pathName
  }
}

export function createParamDecorator(param: any) {
  return () => {
    return (
      target: any,
      propertyKey: string | symbol,
      parameterIndex: number
    ) => {
      if (!target[propertyKey].__params__) {
        target[propertyKey].__params__ = []
      }

      target[propertyKey].__params__.push({
        target,
        propertyKey,
        parameterIndex,
        param,
      })
    }
  }
}

export const Body = createParamDecorator('body')
export const Query = createParamDecorator('query')
