import { IBoot, IEnergizor } from '@kondah/energizor'
import { AsyncLocalStorage } from 'async_hooks'

import { IHttpDriver } from './http-adapter.interface'
import { HttpMethod } from './http-method.enum'
import { HttpStatusCode } from './http-status.enum'
import { HttpContext, IHttpContext } from './http.context'
import { IKondahRequest } from './kondah-request.interface'
import { IKondahResponse } from './kondah-response.interface'
import { RouteData } from './route-data'

export class REST implements IBoot {
  public static controllers: RouteData[] = []

  public constructor(
    private readonly _asyncLocalStorage: AsyncLocalStorage<IHttpContext>,
    private readonly _httpDriver: IHttpDriver,
    private readonly _energizor: IEnergizor
  ) {}

  public onBoot() {
    for (const data of REST.controllers) {
      this._httpDriver.addRoute(
        data.method,
        this.normalizePath(data.target.__endpoint__, data.path),
        async (req, res, next) => {
          this._asyncLocalStorage.run(new HttpContext(req, res), async () =>
            this.createHandler(data)(req, res, next)
          )
        }
      )
    }
  }

  public static makeMethodDecorator(method: HttpMethod) {
    return (path: string, statusCode = HttpStatusCode.OK) =>
      (target: any, key: string) => {
        const handler = target[key]

        REST.controllers.push({
          handler,
          path,
          target,
          method,
          id: target.constructor.name,
          statusCode,
        })
      }
  }

  // @TODO: Add type support
  public static makeParamDecorator(param: any) {
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

  private createHandlerParams(opts: any[], req: IKondahRequest) {
    return opts.map((opt) => {
      const param = req[opt.param]

      if (opt.callback) return opt.callback(param)

      return param
    })
  }

  private asyncRequestHandler(cb: any) {
    return async (req: IKondahRequest, res: IKondahResponse, next) => {
      try {
        return await cb(req, res, next)
      } catch (err) {
        next(err)
      }
    }
  }

  private createHandler(data: RouteData) {
    const instance = this._energizor.get(data.constr!)
    const handler = instance[data.handler.name].bind(instance)

    const handlerAsync = (...args: any[]) =>
      new Promise(async (res, rej) => {
        try {
          const result = await handler(...args)
          return res(result)
        } catch (err) {
          return rej(err)
        }
      })

    return this.asyncRequestHandler(
      async (req: IKondahRequest, res: IKondahResponse, next: any) => {
        const params = this.createHandlerParams(
          data.handler.__params__ ?? [],
          req
        ).reverse()

        const result = await handlerAsync(...params)

        this._httpDriver.setHttpStatusCode(req, data.statusCode || 200)

        return this._httpDriver.sendJson(res, result)
      }
    )
  }

  private normalizePath(controller: string, endpoint: string) {
    const path = controller + endpoint

    if (path.includes('//')) {
      return path.replace('//', '/')
    }

    if (path.slice(-1) === '/') return path.substring(0, path.length - 1)

    return path
  }
}
