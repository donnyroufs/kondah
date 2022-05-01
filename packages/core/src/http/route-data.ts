import { Constructor } from '../kondah-options'
import { HttpMethod } from './http-method.enum'
import { HttpStatusCode } from './http-status.enum'

export class RouteData {
  constructor(
    public readonly path: string,
    public readonly method: HttpMethod,
    // @TODO: Remove handler
    public readonly handler: any,
    public readonly target: { __endpoint__: string },
    public readonly id: string,
    public statusCode?: HttpStatusCode,
    public constr?: Constructor<any>,
    public readonly methodParams?: any
  ) {}
}
