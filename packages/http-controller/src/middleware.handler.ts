import { Dependency, Energizor, MetaTypes } from '@kondah/core'
import { HttpContext } from '../../http-context/lib'
import { Controller } from './metadata.store'
import { MiddlewareTypeIsInvalidException } from './middleware-type-is-invalid.exception'
import { MiddlewareFailedException } from './middlware-failed.exception'
import {
  Constr,
  Dependencies,
  ExecuteFn,
  IControllerOptions,
  IHandler,
  IMiddleware,
  MiddlewareType,
} from './types'
import * as Utils from './utils'

export class MiddlewareHandler implements IHandler<IMiddleware> {
  constructor(
    private readonly _energizor: Energizor,
    private readonly _catchExceptions: boolean
  ) {}

  public createGlobalMiddleware(
    middlewares: Array<Constr<IMiddleware>>,
    route: string,
    options?: IControllerOptions
  ) {
    const globalMiddleware = this.createManyInstancesWithDeps(middlewares)
    const belongsToRoute = options
      ? this.shouldAddGlobalMiddleware(route, options)
      : false

    return this.adaptToExpressTypes(
      globalMiddleware.filter((m) => belongsToRoute && m),
      this._catchExceptions
    )
  }

  public createRouteMiddleware(middlewares: MiddlewareType[]) {
    const routeMiddlewares = this.createManyInstancesWithDeps(middlewares)
    return this.adaptToExpressTypes(routeMiddlewares, this._catchExceptions)
  }

  createInstanceWithDeps(middleware: MiddlewareType): IMiddleware {
    if (!Utils.isClass(middleware) && typeof middleware === 'object') {
      return middleware
    }

    if (typeof middleware !== 'function') {
      throw new MiddlewareTypeIsInvalidException()
    }

    if (!Utils.isClass(middleware) && this.isExecuteFn(middleware)) {
      return {
        execute(context: HttpContext) {
          return middleware(context)
        },
      }
    }

    if (!this.isMiddlewareClass(middleware)) {
      throw new MiddlewareTypeIsInvalidException()
    }

    const dependencies = this.resolveInjectables(middleware)
    const instance = new middleware(...dependencies)

    return instance
  }

  private createManyInstancesWithDeps(middlewares?: MiddlewareType[]) {
    if (!middlewares) return []

    return middlewares.map(this.createInstanceWithDeps.bind(this))
  }

  private adaptToExpressTypes(
    middlewares: IMiddleware[],
    withExceptionHandling = true
  ) {
    if (withExceptionHandling) {
      return middlewares.map((m) => this.wrapMiddlewareWithExceptionHandling(m))
    }

    return middlewares.map((m) => this.wrapMiddleware(m))
  }

  public shouldAddGlobalMiddleware(
    route: string,
    { only, except }: IControllerOptions
  ) {
    if (only && except) {
      throw new Error('cannot declare both only and except')
    }

    if (only) {
      return only.includes(route)
    }

    if (except) {
      return !except.includes(route)
    }

    return true
  }

  private wrapMiddleware(middleware: IMiddleware) {
    return async (req, res, next) => {
      const httpContext = req.kondah.httpContext
      const _next = await middleware.execute(httpContext)

      if (_next) return next()
      if (!_next)
        throw new MiddlewareFailedException(middleware.constructor.name)
    }
  }

  private wrapMiddlewareWithExceptionHandling(middleware: IMiddleware) {
    return async (req, res, next) => {
      try {
        const httpContext = req.kondah.httpContext
        const _next = await middleware.execute(httpContext)

        if (_next) return next()
        if (!_next)
          throw new MiddlewareFailedException(middleware.constructor.name)
      } catch (err) {
        return next(err)
      }
    }
  }

  private resolveInjectables(middleware: Constr<IMiddleware>) {
    const injectables = this.getInjectables(middleware)

    if (!injectables) return []

    return injectables.map((dep: Dependency<unknown>) =>
      this._energizor.get(dep)
    ) as Dependencies
  }

  private getInjectables(controller: Controller): Dependencies {
    return Reflect.get(controller, MetaTypes.injectables)
  }

  private isMiddlewareClass(
    variableToCheck: any
  ): variableToCheck is Constr<IMiddleware> {
    // @ts-ignore
    return (variableToCheck as IMiddleware).injectables !== undefined
  }

  private isExecuteFn(variableToCheck: any): variableToCheck is ExecuteFn {
    return (variableToCheck as ExecuteFn) !== undefined
  }
}
