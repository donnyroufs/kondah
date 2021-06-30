import { Dependency, Energizor } from '@kondah/core'
import { MetaTypes } from './meta.types'
import { Controller } from './metadata.store'
import {
  Constr,
  Dependencies,
  IControllerOptions,
  IHandler,
  RouteDefinition,
} from './types'

export class ControllerHandler implements IHandler<Controller> {
  constructor(
    private readonly _energizor: Energizor,
    private readonly _catchExceptions
  ) {}

  /**
   * Grabs the injectables from the given controller and
   * creates a new instance with it's resolved dependencies.
   */
  createInstanceWithDeps(controller: Constr<Controller>): Controller {
    const dependencies = this.resolveInjectables(controller)
    return new controller(...dependencies)
  }

  createRouteHandler(instance: Controller, methodName: string) {
    if (this._catchExceptions) {
      return this.wrapHandlerWithExceptionHandling(instance, methodName)
    }

    return this.wrapHandler(instance, methodName)
  }

  public getMetaData(controller: Controller) {
    const prefix = Reflect.getMetadata(MetaTypes.prefix, controller) as string
    const options = Reflect.getMetadata(
      'global:middleware',
      controller
    ) as IControllerOptions

    const routes: RouteDefinition[] = Reflect.getMetadata(
      MetaTypes.routes,
      controller
    )

    return {
      prefix,
      routes,
      options,
    }
  }

  private wrapHandler(instance: Controller, methodName: string) {
    return async (req, res, next) => {
      const httpContext = req.kondah.httpContext
      return instance[methodName](httpContext)
    }
  }

  private wrapHandlerWithExceptionHandling(
    instance: Controller,
    methodName: string
  ) {
    return async (req, res, next) => {
      try {
        const httpContext = req.kondah.httpContext
        return await instance[methodName](httpContext)
      } catch (err) {
        return next(err)
      }
    }
  }

  private resolveInjectables(controller: Controller) {
    const injectables = this.getInjectables(controller)

    if (!injectables) return []

    return injectables.map((dep: Dependency<unknown>) =>
      this._energizor.get(dep)
    ) as Dependencies
  }

  private getInjectables(controller: Controller): Dependencies {
    return Reflect.get(controller, MetaTypes.injectables)
  }
}
