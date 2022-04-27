import { Injectable } from '@kondah/energizor'
import { Constructor } from '../kondah-options'
import { HttpMethod } from './http-method.enum'

export class RouteData {
  constructor(
    public readonly path: string,
    public readonly method: HttpMethod,
    public readonly handler: any,
    public readonly target: { __endpoint__: string },
    public readonly id: string,
    public constr?: Constructor<any>,
    public readonly methodParams?: any
  ) {}
}

export const controllers: RouteData[] = []

function makeMethodDecorator(method: HttpMethod) {
  return (path: string) => (target: any, key: string) => {
    const handler = target[key]

    controllers.push({
      handler,
      path,
      target,
      method: method,
      id: target.constructor.name,
    })
  }
}

export function Controller(pathName: string) {
  // eslint-disable-next-line @typescript-eslint/ban-types
  return (target: Function) => {
    Injectable()(target)

    controllers.forEach((ctrl) =>
      ctrl.constr == null && ctrl.id === target.name
        ? // @ts-ignore
          (ctrl.constr = target)
        : null
    )

    target.prototype.__endpoint__ = pathName
  }
}

export function createParamDecorator(param: any) {
  // TODO: Refactor to use pipes
  return (callback?: (val: any) => any) => {
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
        callback,
      })
    }
  }
}

export const Body = createParamDecorator('body')
export const Query = createParamDecorator('query')
export const Params = createParamDecorator('params')
export const Headers = createParamDecorator('headers')

export const Get = makeMethodDecorator(HttpMethod.GET)
export const Post = makeMethodDecorator(HttpMethod.POST)
export const Put = makeMethodDecorator(HttpMethod.PUT)
export const Patch = makeMethodDecorator(HttpMethod.PATCH)
export const Delete = makeMethodDecorator(HttpMethod.DELETE)
